
  // cookies

  var hasVoted = function() {
    return  (document.cookie.replace(/(?:(?:^|.*;\s*)hasVoted\s*\=\s*([^;]*).*$)|^.*$/, "$1") === "true");
  };


$(document).ready(function () {

  if( hasVoted() ){
    $('#vote_submit').val('Already Voted');
    $('#vote_submit').prop('disabled', true);
  }

 //  animate the square

 $('.bubble').animate({transform: "scale(1)"}, 5000, 'linear');

   $('#us-btn').css('opacity', '0.3');
   $('#us-btn-hom').css('opacity', '0.3');


  // button functionality for graphs

  $('#per_100_suicide').hide();
  $('#total-btn').addClass('selected');
  $('#myVideo').hide();
  $('#myVideo').fadeIn(4000);


  $('#total-btn').on('click', function() {
    $('#per_100_suicide').fadeOut(1000);
    $('#per_100_total').show(200);
    $('#total-btn').addClass('selected');
    $('#suicide-btn').removeClass('selected');
    totalChart.update(1000, lazy);
  });

  $('#suicide-btn').on('click', function() {
    $('#per_100_suicide').show(1000);
    $('#per_100_total').fadeOut(1000);
    $('#suicide-btn').addClass('selected');
    $('#total-btn').removeClass('selected');
    suicideChart.update(1000, lazy);
  });

  // scroll functions

  $(window).scroll(function() {

  var scroll = $(window).scrollTop();
  $('#quote').css('background-position-y', -scroll / 3);
  $('#top-quote').css('background-position-y', scroll / 3);


  if ($(this).scrollTop() < 980) {
    $('#columbine').addClass('scroll-it');
  };

  if ($(this).scrollTop() > 900) {
    $('.rectangle-box').addClass('animate');
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
                'rgba(255,0,27,0.8)',
                'rgba(169,169,169,0.2)',
            ],
            borderColor: [
                'rgba(255,99,132,0)',
                'rgba(169,169,169,0.5)',
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
            'rgba(255,0,27,0.8)',
            'rgba(169,169,169,0.2)',
        ],
        borderColor: [
            'rgba(255,99,132,0)',
            'rgba(169,169,169,0.5)',
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
              'rgba(255,0,27,0.8)',
              'rgba(169,169,169,0.2)',
          ],
          borderColor: [
              'rgba(255,99,132,0)',
              'rgba(200,200, 200,0.5)',
          ],
            hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
            ]
        }]
  };

  var waypointVote = new Waypoint({
  element: ctx,
  handler: function() {
    var myChart = new Chart(ctx, {

    type: 'pie',
    data: voteData,
    options: {
      animation: {
        animateScale: true
      }
    }
    })
    this.destroy();
    },
    offset: '75%'
  });

  var circleAus = {
    labels: [
        "Red",
        "Blue",
    ],
    datasets: [
        {
            data: [1, 99],
            backgroundColor: [
                "rgba(255,0,27,0.8)",
                "rgba(42,42,42,0.8)",
            ],
            borderColor: [
                'rgba(255,99,132,0)',
                'rgba(169,169,169,0.1)',
            ],
            hoverBackgroundColor: [
                "rgba(255,0,27,1)",
                "rgba(42,42,42,0.8)",
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
                "rgba(255,0,27,0.8)",
                "rgba(42,42,42,0.8)",
            ],borderColor: [
                'rgba(255,99,132,0)',
                'rgba(169,169,169,0.1)',
            ],
            hoverBackgroundColor: [
                "rgba(255,0,27,0.8)",
                "rgba(255,255,255,0.8)",
            ]
        }]
    };


  // waypoint triggers

  var ctxAus = $('#aus_murder')
  var ctxUsa = $('#us_murder')

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
                y: 6,
                r: 0
              },
              {
                  x: 1999,
                  y: 6,
                  r: 1
              },
              {
                  x: 2000,
                  y: 1.2,
                  r: 40
              },
              {
                  x: 2001,
                  y: 1.4,
                  r: 0
              },
              {
                  x: 2002,
                  y: 1.1,
                  r: 20
              },
              {
                  x: 2003,
                  y: 1,
                  r: 18
              },
              {
                  x: 2004,
                  y: 0.8,
                  r: 16
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
                  r: 20
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
                  r: 10
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
            backgroundColor:"rgba(255,255,255, 0.8)",
            hoverBackgroundColor: "#FF6384",
        }]
      };

      var dataHomBub = {
        datasets: [
            {
                label: 'Australia',
                data: [
                    {
                    // make this invisible
                      x: 1999,
                      y: 6,
                      r: 1
                    },
                    {
                        x: 1999,
                        y: 0.3,
                        r: 25
                    },
                    {
                        x: 2000,
                        y: 0.3,
                        r: 30
                    },
                    {
                        x: 2001,
                        y: 0.3,
                        r: 25
                    },
                    {
                        x: 2002,
                        y: 0.2,
                        r: 10
                    },
                    {
                        x: 2003,
                        y: 0.2,
                        r: 10
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
                        r: 20
                    },
                    {
                        x: 2009,
                        y: 0.1,
                        r: 10
                    },
                    {
                        x: 2010,
                        y: 0.2,
                        r: 14
                    },
                    {
                        x: 2011,
                        y: 0.2,
                        r: 15
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
                backgroundColor: "rgba(255,255,255, 0.8)",
                hoverBackgroundColor: "#FF6384",
            }]
          };

  var waypoint = new Waypoint({
  element: ctxAus,
  handler: function() {
    var ausChart = new Chart( ctxAus,{
      type: 'pie',
      data: circleAus,
      options: {
        animation: {
          animateScale: true
      }
      }
    })
    this.destroy();
  },
  offset: '75%'
  });


  var waypointTwo = new Waypoint({
  element: ctxUsa,
  handler: function() {
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
    })
    this.destroy();
    },
    offset: '75%'
  });


  var waypointThree = new Waypoint({
  element: bubbleCtx,
  handler: function() {

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
            // onProgress: function(animation) {
            //   console.log('hi');
            // }
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
    })
    this.destroy();

    $('#aus-btn').on('click', function() {
      $('#aus-btn').css('opacity', '1');
      $('#us-btn').css('opacity', '0.3');
      $('#aus-btn').addClass('animate-btn');
        $('#us-btn').removeClass('animate-btn');
        $('#switch-title').text('Australia per 100,000');
      myBubbleChart.data.datasets[0].data = [
          {
          // make this invisible
            x: 1999,
            y: 6,
            r: 0
          },
          {
              x: 1999,
              y: 6,
              r: 1
          },
          {
              x: 2000,
              y: 1.2,
              r: 40
          },
          {
              x: 2001,
              y: 1.4,
              r: 0
          },
          {
              x: 2002,
              y: 1.1,
              r: 20
          },
          {
              x: 2003,
              y: 1,
              r: 18
          },
          {
              x: 2004,
              y: 0.8,
              r: 16
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
              r: 20
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
              r: 10
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
      ];
      myBubbleChart.update();
    });

    $('#us-btn').on('click', function() {
      $('#us-btn').css('opacity', '0.3');
      $('#aus-btn').css('opacity', '1');
      $('#us-btn').addClass('animate-btn');
      $('#aus-btn').removeClass('animate-btn');
      $('#switch-title').text('United States per 100,000');
      myBubbleChart.data.datasets[0].data =
      [
          {
            x: 1999,
            y: 6,
            r: 0
          },
          {
              x: 1999,
              y: 6,
              r: 65
          },
          {
              x: 2000,
              y: 6,
              r: 60
          },
          {
              x: 2001,
              y: 5.9,
              r: 49
          },
          {
              x: 2002,
              y: 6,
              r: 60
          },
          {
              x: 2003,
              y: 5.9,
              r: 60
          },
          {
              x: 2004,
              y: 5.8,
              r: 59
          },
          {
              x: 2005,
              y: 5.9,
              r: 50
          },
          {
              x: 2006,
              y: 5.7,
              r: 50
          },
          {
              x: 2007,
              y: 5.9,
              r: 45
          },
          {
              x: 2008,
              y: 5.9,
              r: 48
          },
          {
              x: 2009,
              y: 6,
              r: 52
          },
          {
              x: 2010,
              y: 6.1,
              r: 55
          },
          {
              x: 2011,
              y: 6.1,
              r: 53
          },
          {
              x: 2012,
              y: 6.2,
              r: 55
          },
          {
              x: 2013,
              y: 6.2,
              r: 60
          }
      ];
      myBubbleChart.update();
      $('#switch-title').text('United States per 100,000');
      });

    },
    offset: '75%'
  });

  var waypointFour = new Waypoint({
  element: homBubCtx,
  handler: function() {

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
            // onProgress: function(animation) {
            //   console.log('hi');
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

      $('#aus-btn-hom').on('click', function() {
        $('#aus-btn-hom').css('opacity', '1');
        $('#us-btn-hom').css('opacity', '0.3');
        $('#aus-btn-hom').addClass('animate-btn');
          $('#us-btn-hom').removeClass('animate-btn');
        homocideBubble.data.datasets[0].data = [
          {
          // make this invisible
            x: 1999,
            y: 6,
            r: 0
          },
          {
              x: 1999,
              y: 0.3,
              r: 25
          },
          {
              x: 2000,
              y: 0.3,
              r: 30
          },
          {
              x: 2001,
              y: 0.3,
              r: 25
          },
          {
              x: 2002,
              y: 0.2,
              r: 10
          },
          {
              x: 2003,
              y: 0.2,
              r: 10
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
              r: 20
          },
          {
              x: 2009,
              y: 0.1,
              r: 10
          },
          {
              x: 2010,
              y: 0.2,
              r: 14
          },
          {
              x: 2011,
              y: 0.2,
              r: 15
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
          }
        ];
        homocideBubble.update();
        $('#bubble-title-hom').text('Australia per 100,000');
      });

      $('#us-btn-hom').on('click', function() {
        $('#us-btn-hom').css('opacity', '0.3');
        $('#aus-btn-hom').css('opacity', '1');
        $('#us-btn-hom').addClass('animate-btn');
        $('#aus-btn-hom').removeClass('animate-btn');
        homocideBubble.data.datasets[0].data = [
          {
            x: 1999,
            y: 0,
            r: 0
          },
          {
              x: 1999,
              y: 6,
              r: 65
          },
          {
              x: 2000,
              y: 6,
              r: 60
          },
          {
              x: 2001,
              y: 5.9,
              r: 49
          },
          {
              x: 2002,
              y: 6,
              r: 60
          },
          {
              x: 2003,
              y: 5.9,
              r: 60
          },
          {
              x: 2004,
              y: 5.8,
              r: 59
          },
          {
              x: 2005,
              y: 5.9,
              r: 50
          },
          {
              x: 2006,
              y: 5.7,
              r: 50
          },
          {
              x: 2007,
              y: 5.9,
              r: 45
          },
          {
              x: 2008,
              y: 5.9,
              r: 48
          },
          {
              x: 2009,
              y: 6,
              r: 52
          },
          {
              x: 2010,
              y: 6.1,
              r: 55
          },
          {
              x: 2011,
              y: 6.1,
              r: 53
          },
          {
              x: 2012,
              y: 6.2,
              r: 55
          },
          {
              x: 2013,
              y: 6.2,
              r: 60
          }
        ];
        homocideBubble.update();
        $('#bubble-title-hom').text('United States per 100,000');
      });


      this.destroy();
    },
    offset: '75%'
  });


  });
