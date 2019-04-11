action "Run on specific branch" {
  uses = "actions/bin/filter@master"
  args = "branch develop"
}

action "Install" {
  uses = "actions/npm@e7aaefe"
  args = "install"
  needs = ["Run on specific branch" ]
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

workflow "Build and deploy GitHub Pages" {
  on = "push"
  resolves = ["Deploy"]
}
