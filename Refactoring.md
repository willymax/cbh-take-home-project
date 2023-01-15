# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

if (event.partitionKey) {
candidate = event.partitionKey
} else {
const data = JSON.stringify(event)
candidate = crypto.createHash('sha3-512').update(data).digest('hex')
}
the if else condition can be simplified using logical operator or ternary operator to assign the value of candidate
logical operator is suitable in this case because we assign canditate value based on truthiness of event.partitionKey
if event.partitionKey is resolves to truthy, that is, it is not null, undefined, false, or non empty string we assign assign to candidate else the value of candidate is crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex')
instead of first creating a variable to store data, we can use it directly in the statement since it is only used in the scope
candidate = event.partitionKey || crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex')

But notice the that the candidate variable value is later reassigned using SHA3-512 cryptographic hash of itself later in the code base on whether candidate length is greater than MAX_PARTITION_KEY_LENGTH. We need to avoid repetitive computations that consume time and resources
The initialization of candidate can be simplified to candidate = event.partitionKey || JSON.stringify(event)
If event is not truthy then candidate is not initialized to anything so we can include a else state to initialize to TRIVIAL_PARTITION_KEY constant value

At this point candidate has been initialized but can still not be of type string based on the value of event.partitionKey

We reassign the value if its not of type string and compute its final value of its length is greater than MAX_PARTITION_KEY_LENGTH after reassigning
