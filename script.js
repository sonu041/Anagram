const anagrams = [
  [`Tom Marvolo Riddle`, `I am Lord Voldemort`],
  [`Torchwood`, `Doctor Who`],
  [`Vladimir Nabokov`, `Vivian Darkbloom`]
];
const [W1, W2] = anagrams[Math.floor(Math.random() * anagrams.length)];

const wordContainer1 = $(`.w1`);
const wordContainer2 = $(`.w2`);

const showBtn = $('.show-btn');

for(const letter of W1) {
  wordContainer1.append(`<span class="letter">${letter}</span>`);
}
for(const letter of W2) {
  wordContainer2.append(`<span class="letter">${letter}</span>`);
}

function findObjectInArray(array, key, val) {
  for(let i = 0; i < array.length; i++)
    if(array[i][key].toLowerCase() === val.toLowerCase())
      return i;
  return null;
}

function animate(elem, options, duration = 500) {
  let first = Object.assign({}, options);
  first.top *= rand(100, 120) / 100;
  first.left *= rand(100, 120) / 100;
  elem.animate(first, duration, function() {
    elem.animate(options, duration / 1.5)
  });
}
function rand(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function rearrange(w1, w2) {
  showBtn.addClass('disabled').animate({
    opacity: 0
  }, 300);
  
  let p1 = [];
  let p2 = [];
  
  const yDiff = w2.position().top - w1.position().top;
  console.log(yDiff);
  
  for(let letter of w1.children()) {
    if(!letter.textContent.trim())
      continue;
    letter = $(letter);
    p1.push(Object.assign({}, letter.position(), {
      name: letter.text(),
      element: letter
    }));
  }
  for(let letter of w2.children()) {
    letter = $(letter);
    p2.push(Object.assign({}, letter.position(), {
      name: letter.text(),
      element: letter
    }));
  }
  w1.css({
    position: 'relative',
    height: w1.height()
  });
  for(letter of p1) {
    letter.element.css({
      position: 'absolute',
      left: letter.left,
      top: letter.top
    });
  }
  
  for(const l1 of p1) {
    const l2Index = findObjectInArray(p2, 'name', l1.name);
    const l2 = p2.splice(l2Index, 1)[0];
    console.log(l2)
    setTimeout(
      animate.bind(null, l1.element, {
        top: l2.top + yDiff,
        left: l2.left
      }),
      rand(100, 1000)
    );
  }
}

showBtn.on('click', rearrange.bind(null, wordContainer1, wordContainer2));