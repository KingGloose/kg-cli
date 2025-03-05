async function fetchNPMInfo(npmName, registry = "https://registry.npmjs.org") {
  fetch(`${registry}/${npmName}`).then(res => {
    console.log(res)
  })
}
