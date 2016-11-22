$(document).ready(function () {

  $(window).scroll(function() {

    // scroll functions

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

  $('#new_vote').on('submit', function(e) {

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

      voteData.datasets[0].data[0] = response.true;
      voteData.datasets[0].data[1] = response.false;
      myChart.update( )

      // = [$("#yesVotes").text(response.true), $("#noVotes").text(response.false)];
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

    });


  // TODO: move this into JSON file //////////////////////////////////////////////////

  var data = {
    labels: ["Australia"],
    datasets: [
        {
            label: "Deaths per capita",
            backgroundColor: [
                'rgba(255, 99, 132, 0.9)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
            ],
            borderWidth: 1,
            data: [3],
        }
    ]
  };

  var data_us = {
    labels: ["United States"],
    datasets: [
        {
            label: "Deaths per capita",
            xLabels: [20],
            backgroundColor: [
                'rgba(255, 99, 132, 0.9)',
            ],
            borderColor: [
                'rgba(255,99,132,1)',
            ],
            borderWidth: 1,
            data: [11],
        }
    ]
  };

  // TODO: move this into JSON file //////////////////////////////////////////////////

  // deaths per Capita Chart

  ctxBar = $('#ctxBar-Aus')

  var myBarChart = new Chart (ctxBar, {
    type: 'horizontalBar',
    data: data,
    options: {
    }
  });

  ctxBar_us = $('#ctxBar-Us')

  var myBarChart = new Chart (ctxBar_us, {
    type: 'horizontalBar',
    data: data_us,
    options: {
    }
  });



  // TODO: move data for this into JSON file //////////////////////////////////////////////////

  // making the votes chart

  var ctx = $("#myChart");

  var voteData = {
      labels: ["Yes", "No"],
      datasets: [{
          label: '# of Votes',
          data: [$('#yesVotes').html(), $('#noVotes').html()],
          backgroundColor: [
              'rgba(255, 99, 132, 0.8)',
              'rgba(54, 162, 235, 0.8)',
          ]
      }]
  };

  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    borderSkipped: 'top',
    data: voteData,
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
    labels: [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013],
    datasets: [{
      label: 'Australia',
      data: [1.4, 1.2, 1.4, 1.1, 1, 0.8, 0.7, 0.9, 0.9, 0.8, 0.8, 0.7, 0.6, 0.7, 0.7],
      backgroundColor: "rgba(153,255,51,0.6)"
    }, {
      label: 'United States',
      data: [6, 6, 5.9, 6, 5.9, 5.8, 5.9, 5.7, 5.9, 5.9, 6, 6.1, 6.1, 6.2, 6.2],
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
    }]
  }
}
});

});
