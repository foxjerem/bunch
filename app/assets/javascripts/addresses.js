$(document).ready(function() {
  $('.bunch-submit').on('click', function(event) {
    event.preventDefault();
    $('.address').each(function(){

      GMaps.geocode({
        address: $(this).val(),
        region: "UK",
        callback: function(results, status) {
          if (status == 'OK') {
            var londonResults = results.filter(function(result) {
              return result['address_components'][2]['long_name'] === 'London';
            })
            console.log(londonResults)
            var latlng = results[0].geometry.location;
            // console.log(latlng)
            console.log(results)
            // console.log(results[0]['address_components'][2]['long_name'])
          }
          else {
            console.log("address error")
          }
        }
      })
    })
  })
})