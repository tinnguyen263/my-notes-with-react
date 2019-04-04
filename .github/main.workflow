workflow "Github Pages auto deploy" {
  resolves = ["Deploy to GitHub Pages"]
  on = "push"
}

action "Deploy to GitHub Pages" {
  uses = "JamesIves/github-pages-deploy-action@1.1.1"
}
