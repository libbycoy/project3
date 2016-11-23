// cookies

  var hasVoted = function() {
    return  (document.cookie.replace(/(?:(?:^|.*;\s*)hasVoted\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "true");
  };


$(document).ready(function () {

  if( hasVoted() ){
    $('#vote_submit').val('Already Voted');
    $('#vote_submit').prop('disabled', true);
  }

  // button functionality for graphs

  $('#per_100_suicide').hide();
  $('#total-btn').addClass('selected');

  // $('#per_100_total').hide();

  $('#total-btn').on('click', function() {
    $('#per_100_suicide').fadeOut(1000);
    $('#per_100_total').show(200);
    $('#total-btn').addClass('selected');
    $('#suicide-btn').removeClass('selected');
    totalChart.update(1000, lazy);
  });

  $('#suicide-btn').on('click', function() {
    $('#per_100_suicide').show(200);
    $('#per_100_total').fadeOut(1000);
    $('#suicide-btn').addClass('selected');
    $('#total-btn').removeClass('selected');
    suicideChart.update(1000, lazy);
  });


$('#data-btn').on('click', function() {
  myBubbleChart.data.datasets[0].data = [
      {
      // make this invisible
        x: 1999,
        y: 0,
        r: 0
      },
      {
          x: 1999,
          y: 6,
          r: 15
      },
      {
          x: 2000,
          y: 6,
          r: 30
      },
      {
          x: 2001,
          y: 5.9,
          r: 10
      },
      {
          x: 2002,
          y: 6,
          r: 10
      },
      {
          x: 2003,
          y: 5.9,
          r: 15
      },
      {
          x: 2004,
          y: 5.8,
          r: 30
      },
      {
          x: 2005,
          y: 5.9,
          r: 10
      },
      {
          x: 2006,
          y: 5.7,
          r: 10
      },
      {
          x: 2007,
          y: 5.9,
          r: 15
      },
      {
          x: 2008,
          y: 5.9,
          r: 30
      },
      {
          x: 2009,
          y: 6,
          r: 10
      },
      {
          x: 2010,
          y: 6.1,
          r: 10
      },
      {
          x: 2011,
          y: 6.1,
          r: 30
      },
      {
          x: 2012,
          y: 6.2,
          r: 10
      },
      {
          x: 2013,
          y: 6.2,
          r: 10
      }
  ];
  myBubbleChart.update();
  $('#switch-title').text('United States per 100,000');
});

$('#hom-btn').on('click', function() {
  homocideBubble.data.datasets[0].data = [
      {
      // make this invisible
        x: 1999,
        y: 0,
        r: 0
      },
      {
          x: 2011,
          y: 3.59,
          r: 30
      },
      {
          x: 1999,
          y: 3.37,
          r: 15
      },
      {
          x: 2010,
          y: 3.75,
          r: 10
      },
      {
          x: 2001,
          y: 3.84,
          r: 10
      },
      {
          x: 2003,
          y: 4.11,
          r: 15
      },
      {
          x: 2004,
          y: 4.11,
          r: 30
      },
      {
          x: 2005,
          y: 3.97,
          r: 10
      },
      {
          x: 2006,
          y: 4.18,
          r: 10
      },
      {
          x: 2007,
          y: 4.29,
          r: 15
      },
      {
          x: 2000,
          y: 3.88,
          r: 30
      },
      {
          x: 2008,
          y: 4.19,
          r: 30
      },
      {
          x: 2002,
          y: 3.98,
          r: 10
      },
      {
          x: 2009,
          y: 4.01,
          r: 10
      },

      {
          x: 2012,
          y: 3.55,
          r: 10
      },
      {
          x: 2013,
          y: 3.7,
          r: 10
      },
      {
          x: 2014,
          y: 3.54,
          r: 10
      },

      {
          x: 2015,
          y: 3.56,
          r: 0
      }
  ];
  homocideBubble.update();
  $('#bubble-title').text('United States per 100,000');
});


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

  });


  $('#new_vote').on('submit', function(e) {

    e.preventDefault();

    if( hasVoted() ) {
      return;
    }

    $('.vote_select').prop('disabled', true);
    $('#vote_submit').prop('disabled', true);

    var answer = $('.vote_select:checked').val();

    // ajax handler to submit vote form
    $.ajax('/votes', {
      method: "POST",
      data: {answer: answer}
    })
    .done(function(response) {
      // set cookie to prevent repeat voting
      document.cookie = "hasVoted=true; expires=Fri, 24 Nov 2016 08:59:59 GMT";

      // console.log(response);
      $("#yesVotes").text(response.true);
      $("#noVotes").text(response.false);

      voteData.datasets[0].data[0] = response.true;
      voteData.datasets[0].data[1] = response.false;
      myChart.update( )

    })
    .fail(function(err){
      console.log('hi');
    });
});


  // starts the counters up //////////////////////////////

  $('.counter').counterUp({
    time: 300
  });

  // votes on select disable

  $('.vote_select').click(function(){
    if( !hasVoted() ){
      $('#vote_submit').prop('disabled', false);
    }
  });

  // animate various intros

  $('#scroll').delay(1000).fadeIn(400);

  var showData = $('#show-data');

    // match json data to variables

    // TODO: fix this
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
    labels: ["Suicides by gun", "Other"],
    datasets: [
        {
            label: "Deaths per capita",
            backgroundColor: [
                'rgba(255, 99, 132, 0.9)',
            ],
            borderColor: [
                'rgba(255,99,132,0)',
            ],
            borderWidth: 1,
            data: [178, 2160]
        }
    ]
  };


  // mychart.Line(data,{scaleOverride: true, scaleStartValue: 0, scaleStepWidth: 1, scaleSteps: 30});
  Chart.defaults.global.defaultFontColor = '#fff';
  // Chart.defaults.global.labels.fontColor = 'red'


  var data_us = {
    labels: ["Suicides by gun", "Other"],
    options: {},
    datasets:
    [{
        label: "Deaths per capita",
          backgroundColor: [
            'rgba(255, 99, 132, 0.9)',
        ],
        borderWidth: 1,
        data: [21334 , 42773]
        //scales
        }
    ]
  };

  // TODO: move this into JSON file //////////////////////////////////////////////////

  // deaths per Capita Chart

  ctxBar = $('#ctxBar-Aus');

  var myDoughnutChartAus = new Chart(ctxBar, {
    type: 'doughnut',
    data: data,
    options: {}
  });


  ctxBar_us = $('#ctxBar-Us')

  var myDoughnutChartUs = new Chart (ctxBar_us, {

    type: 'doughnut',
    data: data_us,
    options:
      {
      }

  });



  // TODO: move data for this into JSON file //////////////////////////////////////////////////

  // making the votes chart

  var ctx = $("#myChart");

  var voteData = {
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
  }

  var myChart = new Chart(ctx, {

  type: 'pie',
  data: voteData,
  options: {
    animation: {
      animateScale: true
    }
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

  // total death by firearm

  var suicideCtx = $('#per_100_suicide');

  var suicideChart = new Chart(suicideCtx, {
    type: 'line',
    data: {
      labels: [2009, 2010, 2011, 2012, 2013],
      datasets: [{
        scale: 10,
        label: 'Australia',
        borderColor: "rgba(75,192,192,0)",

        pointBorderColor: "rgba(75,192,192,0)",
        pointBackgroundColor: "rgba(75,192,192,0)",
        pointBorderWidth: 3,
        pointRadius: 1,
        pointHitRadius: 10,
        data:[13752, 13164, 12795, 12888, 12253],
        backgroundColor: "rgba(153,255,51,0.6)"
      }, {
        label: 'United States',
        borderColor: "rgba(75,192,192,0)",

        pointBorderColor: "rgba(75,192,192,0)",
        pointBackgroundColor: "rgba(75,192,192,0)",
        pointBorderWidth: 3,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [9199, 8874, 8653, 8897, 8454 ],
        backgroundColor: "rgba(255,153,0,0.6)"
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
              display: false,
              drawTicks: false
          }
      }],
      yAxes: [{
          gridLines: {
              display: false
          }
      }]
        },
      elements: {
          points: {
              borderWidth: 1,
              borderColor: 'rgb(0, 0, 0)'
          }
      }
    }

});

// total deaths

  var totalCtx = $('#per_100_total');

  var totalChart = new Chart(totalCtx, {
    type: 'line',
    data: {
      labels: [2009, 2010, 2011, 2012, 2013],
      datasets: [{
        scale: 10,
        label: 'Australia',
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,0)",

        pointBorderColor: "rgba(75,192,192,0)",
        pointBackgroundColor: "rgba(75,192,192,0)",
        pointBorderWidth: 3,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [263, 229, 230, 454, 430],
        backgroundColor: "rgba(153,255,51,0.6)"
      }, {
        label: 'United States',
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,0)",

        pointBorderColor: "rgba(75,192,192,0)",
        pointBackgroundColor: "rgba(75,192,192,0)",
        pointBorderWidth: 3,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [ 30, 39, 41, 43, 47],
        backgroundColor: "rgba(255,153,0,0.6)"
      }]
    },
    options: {
      scales: {
        xAxes: [{
          gridLines: {
              borderColor: 'red',
              display: false,
              drawTicks: false
          }
        }],
        yAxes: [{
            gridLines: {
                color: 'transparent'
            }
        }]
      },
      elements: {
          points: {
              borderWidth: 10,
              borderColor: 'rgb(0, 0, 0)'
          }
      }
    }
  });

  bubbleCtx = $('#bubble');
  homBubCtx = $('#bubble-homocide');

  var dataBub = {
    datasets: [
        {
            label: 'First Dataset',
            data: [
                {
                // make this invisible
                  x: 1999,
                  y: 0,
                  r: 0
                },
                {
                    x: 1999,
                    y: 1.4,
                    r: 15
                },
                {
                    x: 2000,
                    y: 1.2,
                    r: 30
                },
                {
                    x: 2001,
                    y: 5.4,
                    r: 10
                },
                {
                    x: 2002,
                    y: 1.1,
                    r: 10
                },
                {
                    x: 2003,
                    y: 1,
                    r: 15
                },
                {
                    x: 2004,
                    y: 0.8,
                    r: 30
                },
                {
                    x: 2005,
                    y: 0.7,
                    r: 10
                },
                {
                    x: 2006,
                    y: 0.9,
                    r: 10
                },
                {
                    x: 2007,
                    y: 0.8,
                    r: 15
                },
                {
                    x: 2008,
                    y: 0.8,
                    r: 30
                },
                {
                    x: 2009,
                    y: 0.8,
                    r: 10
                },
                {
                    x: 2010,
                    y: 0.7,
                    r: 10
                },
                {
                    x: 2011,
                    y: 0.6,
                    r: 30
                },
                {
                    x: 2012,
                    y: 0.7,
                    r: 10
                },
                {
                    x: 2013,
                    y: 0.7,
                    r: 10
                }
            ],
            backgroundColor:"#FF6384",
            hoverBackgroundColor: "#FF6384",
        }]
      };

      var dataHomBub = {
        datasets: [
            {
                label: 'First Dataset',
                data: [
                    {
                    // make this invisible
                      x: 1999,
                      y: 0,
                      r: 0
                    },
                    {
                        x: 1999,
                        y: 0.3,
                        r: 15
                    },
                    {
                        x: 2000,
                        y: 0.3,
                        r: 30
                    },
                    {
                        x: 2001,
                        y: 0.3,
                        r: 10
                    },
                    {
                        x: 2002,
                        y: 0.2,
                        r: 10
                    },
                    {
                        x: 2003,
                        y: 0.2,
                        r: 15
                    },
                    {
                        x: 2004,
                        y: 0.3,
                        r: 30
                    },
                    {
                        x: 2005,
                        y: 0.1,
                        r: 10
                    },
                    {
                        x: 2006,
                        y: 0.1,
                        r: 10
                    },
                    {
                        x: 2007,
                        y: 0.2,
                        r: 15
                    },
                    {
                        x: 2008,
                        y: 0.1,
                        r: 30
                    },
                    {
                        x: 2009,
                        y: 0.1,
                        r: 10
                    },
                    {
                        x: 2010,
                        y: 0.2,
                        r: 10
                    },
                    {
                        x: 2011,
                        y: 0.2,
                        r: 30
                    },
                    {
                        x: 2012,
                        y: 0.1,
                        r: 10
                    },
                    {
                        x: 2013,
                        y: 0.1,
                        r: 10
                    },
                    {
                        x: 2014,
                        y: 0.1,
                        r: 10
                    },
                    {
                        x: 2014,
                        y: 3.7,
                        r: 0
                    },
                ],
                backgroundColor:"#FF6384",
                hoverBackgroundColor: "#FF6384",
            }]
          };


  var myBubbleChart = new Chart(bubbleCtx,{
      type: 'bubble',
      data: dataBub,
      options: {
          animation: {
            percentageInnerCutout: 50,
        animation: true,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        onAnimationComplete: null,
        duration: 3000,
            onProgress: function(animation) {
              console.log('hi');
            }
          },
                  scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              fontColor: 'red'
            },
            gridLines: {
                display: false,
                // drawTicks: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false
            }
        }]
          },
        elements: {
            points: {
                borderWidth: 1,
                borderColor: 'rgb(0, 0, 0)'
            }
        }
      }
  });

  var homocideBubble = new Chart(homBubCtx,{
      type: 'bubble',
      data: dataHomBub,
      options: {
          animation: {
            percentageInnerCutout: 50,
        animation: true,
        animationSteps: 100,
        animationEasing: "easeOutBounce",
        onAnimationComplete: null,
        duration: 3000,
            onProgress: function(animation) {
              console.log('hi');
            }
          },
                  scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              fontColor: 'red'
            },
            gridLines: {
                display: false,
                // drawTicks: false
            }
        }],
        yAxes: [{
            gridLines: {
                display: false
            }
        }]
          },
        elements: {
            points: {
                borderWidth: 1,
                borderColor: 'rgb(0, 0, 0)'
            }
        }
      }
  });

});
