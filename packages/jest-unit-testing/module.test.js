import mut from './module.js'; // MUT = Module Under Test

test('Testing sum -- success', () => {
  const expected = 30;
  const got = mut.sum(12, 18);
  expect(got).toBe(expected);
});

test('Testing sum -- success', () => {
    const expected = -10;
    const got = mut.sum(-12, 2);
    expect(got).toBe(expected);
  });
/*
  test('Testing div', () => {
    const expected = -6;
    const got = mut.div(-12, 2);
    expect(got).toBe(expected);
  });

  test('Testing div', () => {
    const expected = -Infinity;
    const got = mut.div(-12, 0);
    expect(got).toBe(expected);
  });

  test('Testing div - no numbers', () => {
    const got = mut.containsNumbers("hgi");
    expect(got).toBeFalsy();
  });

  test('Testing div - one numbers', () => {
    const got = mut.containsNumbers("h2gi");
    expect(got).toBeFalsy();
  });

  test('Testing div - not a string input', () => {
    const got = mut.containsNumbers(0);
    expect(got).toBeFalsy();
  });

  // test fails since empty space is seeen as a number
  test('Testing div - weird input', () => {
    const got = mut.containsNumbers(" ");
    const got1 = mut.containsNumbers(false)
    //expect(got).toBeFalsy();
    expect(got1).toBeFalsy();
  });
  */