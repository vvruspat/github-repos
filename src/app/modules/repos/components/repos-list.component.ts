import { Component, EventEmitter, OnInit } from '@angular/core';
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

const reposQuery = gql<Response, { query: string }>`
  query ListOfRepositories($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10) {
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
  repos: any[] = [];
  loading = false;
  error: ApolloError | undefined;
  query: string = 'react';
  querySubscription?: QueryRef<Response, { query: string }>;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.querySubscription = this.apollo.watchQuery({
      query: reposQuery,
      variables: {
        query: this.query,
      },
    });

    this.querySubscription.valueChanges.subscribe((result: any) => {
      this.repos = result?.data?.search?.nodes ?? [];

      this.loading = result.loading;
      this.error = result.error;
    });
  }

  onFilterChanged(value: string) {
    this.query = value;
    this.querySubscription?.refetch({ query: value });
  }
}
