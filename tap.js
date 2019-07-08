module.exports = function tap(output, topic) {
    let strLength = 100;
    if (output.length > 0) {
      console.log(`Example output for "${topic}": `, JSON.stringify(output[0]).substring(0, strLength))
    } else {
      console.log(`Example output: The end for "${topic}"`, )
    }
    console.log(`\n`)
    return output;
  }