# workflow "Github Pages auto deploy" {
#   resolves = ["Deploy to GitHub Pages"]
#   on = "push"
# }

# action "Deploy to GitHub Pages" {
#   uses = "JamesIves/github-pages-deploy-action@1.1.1"
# }

workflow "Deploy to Github Pages" {
  on = "push"
  resolves = ["Deploy to gh-pages"]
}

action "test branch only" {
  uses = "actions/bin/filter@master"
  args = "branch test/gh-actions-auto-deploy"
  secrets = [
    "ACTIONS_DEPLOY_TOKEN",
  ]

  # workflow "Github Pages auto deploy" {
  #   resolves = ["Deploy to GitHub Pages"]
  #   on = "push"
  # }

  # action "Deploy to GitHub Pages" {
  #   uses = "JamesIves/github-pages-deploy-action@1.1.1"
  # }
}

action "Deploy to gh-pages" {
  uses = "JamesIves/github-pages-deploy-action@master"
  env = {
    BRANCH = "gh-pages"
    BUILD_SCRIPT = "yarn install && yarn run build"
    FOLDER = "build"
  }
  secrets = [
    "ACTIONS_DEPLOY_TOKEN",
  ]
  needs = ["test branch only"]

  # workflow "Github Pages auto deploy" {
  #   resolves = ["Deploy to GitHub Pages"]
  #   on = "push"
  # }

  # action "Deploy to GitHub Pages" {
  #   uses = "JamesIves/github-pages-deploy-action@1.1.1"
  # }
}
