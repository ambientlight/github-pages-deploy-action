import * as core from "@actions/core";
import * as github from "@actions/github";

const { pusher, repository } = github.context.payload;

export const workspace: any = process.env.GITHUB_WORKSPACE;
export const folder = core.getInput("FOLDER", { required: true });
export const root = ".";
export const isTest = process.env.UNIT_TEST;

// Required action data.
export const action = {
  build: folder,
  gitHubRepository:
    repository && repository.full_name
      ? repository.full_name
      : process.env.GITHUB_REPOSITORY,
  gitHubToken: core.getInput("GITHUB_TOKEN"),
  accessToken: core.getInput("ACCESS_TOKEN"),
  branch: core.getInput("BRANCH"),
  baseBranch: core.getInput("BASE_BRANCH") || "master",
  name:
    pusher && pusher.name
      ? pusher.name
      : process.env.GITHUB_ACTOR
      ? process.env.GITHUB_ACTOR
      : "GitHub Pages Deploy Action",
  email:
    pusher && pusher.email
      ? pusher.email
      : `${process.env.GITHUB_ACTOR ||
          "github-pages-deploy-action"}@users.noreply.github.com`,
  clean: core.getInput("CLEAN")
};

// Repository path used for commits/pushes.
export const repositoryPath = `https://${action.accessToken ||
  `x-access-token:${action.gitHubToken}`}@github.com/${
  action.gitHubRepository
}.git`;
