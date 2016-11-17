$(document).ready(function () {
  $('#get-data').click(function () {
    var showData = $('#show-data');

    $.getJSON('/assets/votes.json', function (data) {
      console.log(Object.keys(data['likelihood']["United States"]));

      var items = data['perCapita'];
      var key;
      var likelihood = Object.keys(data['likelihood']["United States"][0]);
      console.log(likelihood);

      // for (var key in items) {

      $('#data-1').append(['America'], items['United States']);
      $('#data-2').append((likelihood));
      // }

    });

  });
});
