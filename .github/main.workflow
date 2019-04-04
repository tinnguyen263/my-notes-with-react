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

action "master branch only" {
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Deploy to gh-pages" {
  uses = "JamesIves/github-pages-deploy-action@master"
  env = {
    BRANCH = "gh-pages"
    BUILD_SCRIPT = "yarn install && yarn run build"
    FOLDER = "build"
  }
  secrets = [
    "GITHUB_TOKEN",
  ]
  needs = ["master branch only"]
}
