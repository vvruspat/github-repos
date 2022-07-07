import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApolloError } from '@apollo/client/core';
import { TRelayPageInfo } from '@apollo/client/utilities/policies/pagination';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Repository } from 'src/app/types/repository.type';

type Response = {
  search: {
    nodes: Repository[];
    pageInfo: TRelayPageInfo;
    repositoryCount: number;
  };
};

const reposQuery = gql<Response, { query: string; after?: string }>`
  query ListOfRepositories($query: String!, $after: String) {
    search(query: $query, after: $after, type: REPOSITORY, first: 10) {
      nodes {
        ... on Repository {
          id
          name
          forkCount
          url
          stargazerCount
          isPrivate
          owner {
            avatarUrl
            login
          }
          description
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
      repositoryCount
    }
  }
`;

@Component({
  selector: 'repos-list',
  templateUrl: './repos-list.component.html',
  styleUrls: ['./repos-list.component.css'],
})
export class ReposListComponent implements OnInit {
  repos: Repository[] = [];
  loading = false;
  error: ApolloError | undefined;
  query: string = 'react';
  hasNextPage: boolean = true;
  endCursor?: string;
  querySubscription?: QueryRef<Response, { query: string; after?: string }>;

  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery({
      query: reposQuery,
      variables: {
        query: this.query,
      },
      errorPolicy: 'all',
    });

    // Я знаю, что этот метод depricated, но по какой-то причине, ошибка до observer не долетает. Разобраться пока не вышло.
    this.querySubscription.valueChanges.subscribe(
      (result) => {
        this.repos = this.repos.concat(result?.data?.search?.nodes ?? []);

        this.endCursor = result.data.search.pageInfo.endCursor;
        this.hasNextPage = result.data.search.pageInfo.hasNextPage;
      },
      (error) => {
        this.error = error;
        // Примитивное поведение, но пока достаточно
        localStorage.setItem('token', '');
        this.router.navigateByUrl('token');
      },
      () => {
        this.loading = false;
      }
    );

    // this.querySubscription.valueChanges.subscribe(observer => {
    //   this.repos = this.repos.concat(observer?.data?.search?.nodes ?? []);

    //   this.error = observer.error;
    //   this.endCursor = observer.data.search.pageInfo.endCursor;
    //   this.hasNextPage = observer.data.search.pageInfo.hasNextPage;
    //   this.loading = false;
    // });
  }

  onFilterChanged(value: string) {
    this.loading = true;
    this.repos = [];
    this.query = value;
    this.querySubscription?.refetch({ query: value });
  }

  onIntersection(evt: IntersectionObserverEntry) {
    if (this.hasNextPage && evt.isIntersecting) {
      this.querySubscription?.refetch({
        query: this.query,
        after: this.endCursor,
      });
      this.loading = true;
    }
  }
}
