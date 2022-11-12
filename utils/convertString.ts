// From:
// How to evolve from anyscript to typescript?
// To:
// how-to-evolve-from-anyscript-to-typescript

const str = process.argv[2]
if(str) {
    let res = ''
    for(const c of str.toLowerCase().matchAll(/[A-Za-z0-9 _-]/g)) {
        res += c
    }
    res = res.replace(/ |_/g, '-')
    console.log(res)
}
