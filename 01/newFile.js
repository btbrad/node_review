const cpu = require('cpu-stat');
function getStat() {
  cpu.usagePercent((err, percent) => {
    if (err)
      return;
    console.log(`cpu使用率${percent.toFixed(2)}`);
  })
}

module.exports = getStat