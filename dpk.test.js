const crypto = require('crypto')
const { deterministicPartitionKey } = require('./dpk')

describe('deterministicPartitionKey', () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey()
    expect(trivialKey).toBe('0')
  })
  test('Returns the value of the partitition key if provided', () => {
    // event.partitionKey will be defined and is a string
    const event = { partitionKey: 'a_partition_key' }
    expect(deterministicPartitionKey(event)).toBe('a_partition_key')
  })

  test('Returns SHA3-512 cryptographic hash value of JSON string if partitionKey is not in the event object', () => {
    const event = { test_property: 'test_property' }
    const data = JSON.stringify(event)
    expect(deterministicPartitionKey(JSON.stringify(event))).toBe(data)
  })
})
