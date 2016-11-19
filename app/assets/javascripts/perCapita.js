$(document).ready(function () {

  $(function() {

  });

    var showData = $('#show-data');

    $.getJSON('/assets/votes.json', function (data) {
      // console.log(Object.keys(data['likelihood']["United States"]));

      var items = data['perCapita'];
      var key;
      var likelihood = data['likelihood']["United States"];
      var likelihoodAus = data['likelihood']["Australia"];

      $('#scroll').hide();
      $('#data-1').append(['United States: '], items['United States']).hide();
      $('#data-2').append(['Australia: '], items['Australia']).hide();
      $('#data-3').append(likelihood[0].deaths).hide();
      $('#data-4').prepend(likelihood[0].same).fadeIn(1000).hide();
      $('#data-5').append(likelihoodAus[0].deaths).fadeIn(1000).hide();
      $('#data-6').prepend(likelihoodAus[0].same).fadeIn(1000).hide();


      $(window).scroll(function() {

        if ($(this).scrollTop() > 150) {
          $('#scroll').fadeIn(1000);
        } else {
          $('#scroll').fadeOut();
        }

       if ($(this).scrollTop() > 260) {
         $('#data-1').fadeIn(1000);
         $('#data-2').fadeIn(1000);
       } else {
         $('#data-1').fadeOut();
         $('#data-2').fadeOut();
       }

       if ($(this).scrollTop() > 1700) {
         $('#data-3').fadeIn(1000);
         $('#data-4').fadeIn(1000);
         $('#data-5').fadeIn(1000);
         $('#data-6').fadeIn(1000);
       } else {
         $('#data-3').fadeOut();
         $('#data-4').fadeOut();
         $('#data-5').fadeOut();
         $('#data-6').fadeOut();
       }

      //  if ($(this).scrollTop() > 800) {
      //     $('#data-3').append(likelihood[0].deaths).fadeIn(1000);
      //     $('#data-4').prepend(likelihood[0].same).fadeIn(1000);
      //     $('#data-5').append(likelihoodAus[0].deaths).fadeIn(1000);
      //     $('#data-6').prepend(likelihoodAus[0].same).fadeIn(1000);
      //   }  else {
      //     $('#data-3').html('');
      //     $('#data-4').html('');
      //     $('#data-5').html('');
      //     $('#data-6').html('');
      //   }
      });

  });

  var data = {
    labels: ["US", "Australia"],
    datasets: [
        {
            label: "Deaths per capita",
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
            data: [3, 11],
        }
    ]
  };

  ctxBar = $('#ctxBar')

  var myBarChart = new Chart (ctxBar, {
    type: 'horizontalBar',
    data: data,
    options: {
      title: {
          display: true,
          text: 'Custom Chart Title'
      }
    }
  }
  });

  // making the votes chart

  var ctx = $("#myChart");

  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});



});
