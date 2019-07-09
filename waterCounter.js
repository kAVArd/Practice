// initial array
const arr = [2, 1, 5, 0, 3, 4, 7, 2, 3, 1, 0]

let leftMax = 0
let rightMax = 0
let left = 0
let right = arr.length - 1
let volume = 0

while (left < right) {
  if (arr[left] > leftMax) {
    leftMax = arr[left]
  }
  if (arr[right] > rightMax) {
    rightMax = arr[right]
  }
  if (leftMax >= rightMax) {
    volume += rightMax - arr[right]
    right--
  } else {
    volume += leftMax - arr[left]
    left++
  }
}

console.log(volume)
