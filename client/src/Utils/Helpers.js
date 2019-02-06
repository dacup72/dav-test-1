export default {
  removeArrayDuplicates: function(arr) {
    return arr.map(e => e["id"])
      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)
      // eliminate the dead keys & store unique objects
      .filter(e => arr[e]).map(e => arr[e])
  },
  removeOfferDuplicates: function(arr) {
    const unique = [];
    arr.map(x => unique.filter(a => a.description === x.description && a.name === x.name && a.terms === x.terms).length > 0
      ? null
      : unique.push(x)
    );
    return unique;
  },
  removeRetailerDuplicates: function(arr) {
    const unique = [];
    arr.map(x => unique.filter(a => a.retailer_id === x.retailer_id && a.offer_id === x.offer_id).length > 0
      ? null
      : unique.push(x)
    );
    return unique;
  },
  groupOffers: function(arr) {
    let result = [];
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
      if (newArr.length === 3) {
        result.push(newArr);
        newArr = [];
      }
      else if (i === arr.length - 1) {
        newArr.push(arr[i]);
        result.push(newArr);
      }
      else {
        newArr.push(arr[i]);
      }
    }
    return result;
  }
}