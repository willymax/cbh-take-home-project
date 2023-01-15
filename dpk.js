const crypto = require('crypto')

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = '0'
  const MAX_PARTITION_KEY_LENGTH = 256
  let candidate

  if (event) {
    // if event is truthy
    // use logical operator to get the value of candidate instead of if else
    candidate = event.partitionKey || JSON.stringify(event)
  } else {
    // if event doesn't resolve to truthy then initilize candidate to TRIVIAL_PARTITION_KEY
    candidate = TRIVIAL_PARTITION_KEY
  }

  // candidate has been initialized but can still not be of type string based on the value of event.partitionKey
  if (typeof candidate !== 'string') {
    candidate = JSON.stringify(candidate)
  }

  // at this point candidate has some value and is a string
  // compute the SHA3-512 cryptographic hash of the JSON-stringified of the candidate and reassign
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash('sha3-512').update(candidate).digest('hex')
  }
  return candidate
}
