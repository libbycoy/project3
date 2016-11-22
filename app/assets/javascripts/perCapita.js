$(document).ready(function () {

  $('#new_vote').on('submit', function(e){

    $('.vote_select').prop('disabled', true);
    $('#vote_submit').prop('disabled', true);

    var answer = $('.vote_select:checked').val();

    console.log($(this));

    e.preventDefault();

    // ajax handler to submit vote form
    $.ajax('/votes', {
      method: "POST",
      /// need to submit value from form here!
      data: {answer: answer}
    })
    .done(function(response){
      // var truth = Vote.group(:answer => true).count;
      // var falsth = Vote.group(:answer => false).count;
      //$('#yesVotes').html(), $('#noVotes').html()
      console.log(response);
      $("#yesVotes").text(response.true);
      $("#noVotes").text(response.false);
    })
    .fail(function(err){

    });

  });

  // starts the counters up //////////////////////////////

  $('.counter').counterUp({
    time: 300
  });

  // votes on select disable

  $('.vote_select').click(function(){
    $('#vote_submit').prop('disabled', false);
  });

  // animate various intros

  $('#scroll').delay(1000).fadeIn(400);


    var showData = $('#show-data');

    // match json data to variables

    $.getJSON('/assets/votes.json', function (data) {
      // console.log(Object.keys(data['likelihood']["United States"]));
      var items = data['perCapita'];
      var key;
      var likelihood = data['likelihood']["United States"];
      var likelihoodAus = data['likelihood']["Australia"];

      $('#main-nav').hide();
      $('#timeline').hide();
      $('#scroll').hide();
      $('#data-1').append(['United States: '], items['United States']).hide();
      $('#data-2').append(['Australia: '], items['Australia']).hide();
      $('#data-3').append(likelihood[0].deaths).hide();
      $('#data-4').prepend(likelihood[0].same).fadeIn(1000).hide();
      $('#data-5').append(likelihoodAus[0].deaths).fadeIn(1000).hide();
      $('#data-6').prepend(likelihoodAus[0].same).fadeIn(1000).hide();


      // scroll functions

      $(window).scroll(function() {

      var scroll = $(window).scrollTop();
      $('#quote').css('background-position-y', -scroll / 3);
      $('#top-quote').css('background-position-y', scroll / 3);

       if ($(this).scrollTop() > 260) {
         $('#data-1').fadeIn(1000);
         $('#data-2').fadeIn(1000);
       } else {
         $('#data-1').fadeOut();
         $('#data-2').fadeOut();
       }

       if ($(this).scrollTop() > 860) {
         $( "#main-nav" ).slideDown(400);
         $('#timeline').slideDown(400);
         $('.australia').addClass('img-scale');
      } else {
          $( "#main-nav" ).slideUp(400);
          $('#timeline').slideUp(400);
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

  // TODO: move this into JSON file //////////////////////////////////////////////////

  var data = {
    labels: ["US", "Australia"],
    datasets: [
        {
            label: "Deaths per capita",
            backgroundColor: [
                'rgba(255, 99, 132, 0.9)',
                'rgba(54, 162, 235, 0.9)',
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

  // TODO: move this into JSON file //////////////////////////////////////////////////

  // deaths per Capita Chart

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
  });


  // TODO: move data for this into JSON file //////////////////////////////////////////////////

  // making the votes chart

  var ctx = $("#myChart");

  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    borderSkipped: 'top',
    data: {
        labels: ["Yes", "No"],
        datasets: [{
            label: '# of Votes',
            data: [$('#yesVotes').html(), $('#noVotes').html()],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
                'rgba(54, 162, 235, 0.8)',
            ]
        }]
    },
    options: {
      scales: {
        xAxes: [{
                gridLines: {
                    display:false,
                    drawTicks: false
                }
            }],
            yAxes: [{
                gridLines: {
                    display: false
                }
            }]
              },
      title: {
            display: false,
          },
      animation: {
        easing: 'easeOutQuad',
        duration: 1500
      },
      showLines: false,
    }
});

  var circleAus = {
    labels: [
        "Red",
        "Blue",
    ],
    datasets: [
        {
            data: [44, 56],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
            ]
        }]
};

  var circleUsa = {
    labels: [
        "Red",
        "Blue",
    ],
    datasets: [
        {
            data: [69, 31],
            backgroundColor: [
                "#FF6384",
                "#36A2EB",
            ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
            ]
        }]
    };

  var ctxAus = $('#aus_murder')
  var ctxUsa = $('#us_murder')

  var ausChart = new Chart( ctxAus,{
    type: 'pie',
    data: circleAus,
    options: {
      animation: {
        animateScale: true
    }
    }
  });

  var usaChart = new Chart( ctxUsa,{
    type: 'pie',
    data: circleUsa,
    options: {
      gridLines: {
        display: false
      },
      animation: {
        animateScale:true
    }
    }
  });

  var suicideCtx = $('#suicide');

  var suicideChart = new Chart(suicideCtx, {
  type: 'line',
  data: {
    labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    datasets: [{
      label: 'apples',
      data: [12, 19, 3, 17, 6, 3, 7],
      backgroundColor: "rgba(153,255,51,0.6)"
    }, {
      label: 'oranges',
      data: [2, 29, 5, 5, 2, 3, 10],
      backgroundColor: "rgba(255,153,0,0.6)"
    }]
  }, options: {
    responsive: true,
    legend:{
      display: false
  },
  scales: {
    xAxes: [{
        gridLines: {
            show: false
        }
    }],
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  }
}
});

});
