function find(rats) {
  let poisonedIndex = 0;
  for (let rat of rats) {
    poisonedIndex += 1 << rat;
  }
  return poisonedIndex + 1;
}

function assertEquals(actual, expected) {
  if (actual === expected) {
    console.log(`Правильно: ${actual}`);
  } else {
    console.log(`Помилка: очікувалося ${expected}, отримано ${actual}`);
  }
}

assertEquals(find([1]), 2);
assertEquals(find([0, 1, 2]), 7);
assertEquals(find([3, 5, 6, 7, 8, 9]), 1000);
assertEquals(find([0, 3, 5, 4, 9, 8]), 825);
assertEquals(find([0, 1, 9, 3, 5]), 555);
assertEquals(find([0, 1, 2, 3, 4, 6]), 95);
assertEquals(find([0, 1, 3, 4]), 27);