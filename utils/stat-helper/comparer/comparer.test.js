const { isValidScreenshot } = require('./index.js');


for (let i = 1; i <= 10; i++) {
  test(`Validate sample screenshot i${i}.jpeg in stats-helper/comparer`, (done) => {
    const img = `${__dirname}\\samples\\i${i}.jpeg`
    const resp = isValidScreenshot(img)
    try {
      expect(resp).resolves.toBe(i !== 9 ? true : false)
    } catch (error) {
      done(error)
    }
    done()
  })
}