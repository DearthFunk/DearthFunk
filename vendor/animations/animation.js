class Animation {

  getRandomNumber(from, to, decimals) {
    let response = decimals === undefined ?
      Number(Math.random()*(to-from)+from) :
      Number((Math.random()*(Number(to)-Number(from))+Number(from)).toFixed(decimals));
    return response;
  }

  randomRgba(opacity = this.getRandomNumber(0, 1, 2)) {
    var r = this.getRandomNumber(0,255,0);
    var g = this.getRandomNumber(0,255,0);
    var b = this.getRandomNumber(0,255,0);
    return `RGBA(${r},${g},${b},${opacity})`;
  }

  fadeCanvas(ctx, width, height, amount) {
    let oldArray = ctx.getImageData(0, 0, width, height);
    // count through only the alpha pixels and lighten them
    for (let d = 3; d < oldArray.data.length; d += 4) {
      oldArray.data[d] = Math.floor(oldArray.data[d] * amount);
    }
    ctx.putImageData(oldArray, 0, 0);
  }

}