action "Run on specific branch only" {
  uses = "actions/bin/filter@master"
  args = "branch test/auto-build"
}

action "Install" {
  uses = "actions/npm@e7aaefe"
  args = "install"
  needs = ["Run on specific branch only" ]
}

action "Build" {
  uses = "actions/npm@e7aaefe"
  args = "run build"
  needs = ["Install"]
}

action "Deploy" {
  uses = "nchaulet/github-action-gh-pages@master"
  secrets = [
    "GITHUB_TOKEN",
  ]
  needs = ["Build"]
  env = {
    PUBLIC_PATH = "build"
  }
}

workflow "Build and deploy" {
  on = "push"
  resolves = ["Deploy"]
}
