const sharp = require('sharp'),
  fs = require('fs')

const images = ["i10.jpg"]

images.forEach(image => {
  sharp(image)
    .png()
    .toFile(`${image.split('.')[0]}.jpeg`, () => fs.unlinkSync(image) /* delete original */)
})

// sharp('./comparer/SAMPLE.png')
//   .toBuffer()
//   .then(buffer => {
//     fs.writeFileSync('buffer.txt', buffer.toString('hex'))
//   })