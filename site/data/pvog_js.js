//rangeSearch Genome Size

$.fn.dataTable.ext.search.push(
  function(settings, data, dataIndex) {
    var min = parseInt($('#min-genome').val(), 10);
    var max = parseInt($('#max-genome').val(), 10);
    var noGenome = parseFloat(data[2]) || 0;

    if ((isNaN(min) && isNaN(max)) ||
      (isNaN(min) && noGenome <= max) ||
      (min <= noGenome && isNaN(max)) ||
      (min <= noGenome && noGenome <= max)) {
      return true;
    }
    return false;
  }
);


//rangeSearch Proteins
$.fn.dataTable.ext.search.push(
  function(settings, data, dataIndex) {
    var min = parseInt($('#min-pro').val(), 10);
    var max = parseInt($('#max-pro').val(), 10);
    var noPro = parseFloat(data[3]) || 0;

    if ((isNaN(min) && isNaN(max)) ||
      (isNaN(min) && noPro <= max) ||
      (min <= noPro && isNaN(max)) ||
      (min <= noPro && noPro <= max)) {
      return true;
    }
    return false;
  }
);


//rangeSearch pVOGs
$.fn.dataTable.ext.search.push(
  function(settings, data, dataIndex) {
    var min = parseInt($('#min-vog').val(), 10);
    var max = parseInt($('#max-vog').val(), 10);
    var nopVOG = parseFloat(data[4].split(" ")[1]) || 0;

    if ((isNaN(min) && isNaN(max)) ||
      (isNaN(min) && nopVOG <= max) ||
      (min <= nopVOG && isNaN(max)) ||
      (min <= nopVOG && nopVOG <= max)) {
      return true;
    }
    return false;
  }
);



/**
$(function() {
  $("#slider-protein").slider({
    range: true,
    min: 2,
    max: 229,
    step: 1,
    values: [2,229],
    slider: function(event, ui) {
      $("#amount").val("$" + ui.values[0] + " - " + ui.values[1]);
    }
  });
  $( "#amount" ).val( "$" + $( "#slider-protein" ).slider( "values", 0 ) +
      " - $" + $( "#slider-protein" ).slider( "values", 1 ) );
} )
**/
$(document).ready(function() {

  //display search boxes on click
  $('#rangeLink').click(function() {
    $('#rangeSearch').toggle('slow');
  });

  var table = $('#example').DataTable({
    lengthMenu: [
      [10, 25, 50, -1],
      [10, 25, 50, "All"]
    ],
    select: true,
    dom: 'Blfrtip',
    buttons: [
      {
        extend: 'colvis',
        text: 'Show/Hide Columns'
      },
      {
        extend: 'collection',
        text: 'Export options',
        buttons: [
          {
            extend: 'pdf',
            text: 'pdf all'
          },
          {
            extend: 'pdf',
            text: 'pdf selected',
            exportOptions: {
              modifier: {
                selected: true
              }
            }
          },
          {
            extend: 'copy',
            text: 'copy all'
          },
          {
            extend: 'copy',
            text: 'copy selected',
            exportOptions: {
              modifier: {
                selected: true
              }
            }
          },
          {
            extend: 'print',
            text: 'print all'
          },
          {
            extend: 'print',
            text: 'print selected',
            exportOptions: {
              modifier: {
                selected: true
              }
            }
          },
          {
            extend: 'csv',
            text: 'csv all'
          },
          {
            extend: 'csv',
            text: 'csv selected',
            exportOptions: {
              modifier: {
                selected: true
              }
            }
          },
          {
            extend: 'excel',
            text: 'excel all'
          },
          {
            extend: 'excel',
            text: 'excel selected',
            exportOptions: {
              modifier: {
                selected: true
              }
            }
          }
        ]
      }
    ],
    ajax: "./src/genomeJSON.txt",
    rowReorder : true,
    columnDefs : [
      {
        targets : 0,
        render : function(data) {
          var split = data.split("|");
          var name = split[0];
          var id = split[1];
          return '<a href="https://www.ncbi.nlm.nih.gov/Taxonomy/Browser/wwwtax.cgi?id='
            + id + '"">' + name +'</a>';
        }
      },
      {
        targets : 1,
        render : function(data) {
          var split = data.split(",");
          var ans = "";
          if (split.length > 1) {
            for (var i = 0; i < split.length; i++) {
              ans = ans + '<a href="https://www.ncbi.nlm.nih.gov/nuccore/'
                + split[i] + '"">' + split[i] + " &#10138" +'</a> </br>';
            }
            return ans;
          }
          return '<a href="https://www.ncbi.nlm.nih.gov/nuccore/'
            + data + '"">' + data + " &#10138" +'</a>';
        }
      },
      {
        targets : 3,
        render : function(data) {
          return '<a href = ".protein.html#hash=' + data.split("|")[1] + '">' + data.split("|")[0] + '</a>';
        }
      },
      {
        targets : 4,
        render : function(data) {
          //DO NOT CHANGE THIS!
          //Spaces are set up so that it can be sorted
          return '<a href=""> ' + data + " &#10138" + ' </a>';
        }
      },
      /*{
        targets : 7,
        render : function(data) {
          return data.split(",").join(",<br />");
        }
      },*/
      {
        targets : 8,
        render : function(data) {

          var phrases = data.split(" ");
          if (phrases[1] && phrases[2]) {
            return phrases[0] + "<br />" + phrases[1] + " " + phrases[2];
          } else {
            return data;
          }
        }
      },

    ],
    //initialize the table with the following cretirias
    "aoColumns" : [
      null,
      null,
      null,
      null,
      {'sType' : 'vog',},
      null,
      null,
      null,
      null,
      null,
      null],

    initComplete: function() {

      //column dropdown
      this.api().columns([6, 7, 8, 9, 10]).every(function() {
        var column = this;
        var selectFooter =
          $('<select><option value="">Show All</option><select>')
          .appendTo($(column.footer()).empty())
          .on('change', function() {
            var val = $.fn.dataTable.util.escapeRegex(
              $(this).val()
            );

            column
              .search(val ? '^' + val + '$' : '', true, true, false)
              .draw();
          });

        column.data().unique().sort().each(function(d, j) {
          selectFooter.append('<option value="' + d + '">' + d + '</option>');
        });
      });

      //search boxes
      this.api().columns([0, 1, 2, 3, 4, 5]).every(function() {
        var column = this;
        //first add the boxes
        //then apply the actual search
        var searchFooter =
          $('<input type="text" placeholder="search"/>')
          .appendTo($(column.footer()))
          .on('keyup', function() {
            var val = $.fn.dataTable.util.escapeRegex(
              $(this).val()
            );
        column
          .search(val,false,true,true)
          .draw();
          });
      });
    }
  });

  table.buttons().container()
    .appendTo('#rangeSearchWrapper .col-sm-6:eq(0)');

  $('#min-genome, #max-genome').keyup(function() {
    table.draw();
  });

  $('#min-pro, #max-pro').keyup(function() {
    table.draw();
  });

  $('#min-vog, #max-vog').keyup(function() {
    table.draw();
  });

  $(window).bind('resize', function() {
    table.fnAdjustColumnSizing();
  });

  $('#example tbody').on('click', 'tr', function() {
    $(this).toggleClass('selected');
  });
});


// The following 3 are custom sortings for # of VOGs
function getNum (vogs) {
  res = Number(vogs.split(" ")[2]);
  return res;
};

jQuery.fn.dataTableExt.oSort["vog-desc"] = function(x, y) {
  return getNum(x) < getNum(y);
};

jQuery.fn.dataTableExt.oSort["vog-asc"] = function(x, y) {
  return getNum(x) > getNum(y);
};
