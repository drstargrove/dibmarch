
Plotly.d3.csv("processed_data_lower_mag_7.csv", function(data){
  Plotly.d3.csv("bound_20.csv", function(data2){
    Cs = ['Col', 'Com', 'CrA', 'CrB', 'Crt', 'Cru', 'Crv', 'Cyg', 'Del', 'Dor', 'Dra', 'Equ', 'Eri', 'For', 'Gem', 'Gru', 'Her', 'Hor', 'Hya', 'Hyi', 'Ind', 'LMi', 'Lac', 'Leo', 'Lep', 'Lib', 'Lup', 'Lyn', 'Lyr', 'Men',];
    Csn = ['Columba', 'Coma Berenices', 'Corona Austrina', 'Corona Borealis', 'Corvus', 'Crater', 'Crux', 'Cygnus', 'Delphinus', 'Dorado', 'Draco', 'Equuleus', 'Eridanus', 'Fornax', 'Gemini', 'Grus', 'Hercules', 'Horologium', 'Hydra', 'Hydrus', 'Indus', 'Lacerta', 'Leo', 'Leo Minor', 'Lepus', 'Libra', 'Lupus', 'Lynx', 'Lyra', 'Mensa'];
  
    for (var l=0;l<Cs.length;l++) {
      var ras1=[],ras2=[],ras3=[],ras4=[],ras5=[],ras6=[];
      var decs1=[],decs2=[],decs3=[],decs4=[],decs5=[],decs6=[];
      var con1=[],con2=[],con3=[],con4=[],con5=[],con6=[];
      var hovs1=[],hovs2=[],hovs3=[];
      var boundras=[],bounddecs=[];
      
      for( var i=0;i<data2.length;i++){
        var rab_txt=parseFloat(data2[i].ra*-15)
        var rab_tmp=rab_txt;
        if (rab_tmp <= -180){
          rab_tmp=rab_tmp+360;
        }
        var decb_tmp=parseFloat(data2[i].dec);
        var bound_name = data2[i].name;
        if (bound_name.substring(0,3) == Cs[l].toUpperCase()) {
          boundras.push(rab_tmp);
          bounddecs.push(decb_tmp)
        }
      }

      for( var i=0;i<data.length;i++){
        var constel = data[i].constellation;
        var magnitude=parseFloat(data[i].mag);
        var absmagnitude=parseFloat(data[i].absmag)
        var colorIndex=parseFloat(data[i].ci)
        var ra_txt=parseFloat(data[i].ra * -15)
        var ra_tmp=ra_txt;
        if (ra_tmp <= -180){
          ra_tmp=ra_tmp+360;
        }
        var dec_tmp=parseFloat(data[i].dec);
        var spect=data[i].spect;
        var distance = parseFloat(data[i].distance);
        var hovertext_tmp = "<b>"+data[i].name+"</b><br>( RA: "+ra_txt.toFixed(2)*-1+"°, Dec: "+dec_tmp.toFixed(2)+"° )<br>Mag: "+magnitude+"<br>Abs Mag: "+absmagnitude+"<br>B-V: "+colorIndex+"<br>Type: "+ spect+"<br>Distance: "+distance+"pc";
        if (constel == Cs[l]) {
          if (magnitude >= 6 & magnitude <7){
            ras6.push(ra_tmp);
            decs6.push(dec_tmp);
            con6.push(constel);
          }
          if (magnitude >= 5 & magnitude <6){
            ras5.push(ra_tmp);
            decs5.push(dec_tmp);
            con5.push(constel)
          }
          if (magnitude >= 4 & magnitude <5){
            ras4.push(ra_tmp);
            decs4.push(dec_tmp);
            con4.push(constel)
          }   
          if (magnitude >= 3 & magnitude <4){
            ras3.push(ra_tmp);
            decs3.push(dec_tmp);
            hovs3.push(hovertext_tmp);
            con3.push(constel)
          }
          if (magnitude >= 2 & magnitude < 3){
            ras2.push(ra_tmp);
            decs2.push(dec_tmp);
            hovs2.push(hovertext_tmp);
            con2.push(constel)
          }
          if (magnitude < 2){
            ras1.push(ra_tmp);
            decs1.push(dec_tmp);
            hovs1.push(hovertext_tmp);
            con1.push(constel);
          }
        }
      }  

      var minRa = Math.min.apply(null, boundras);
      var maxRa = Math.max.apply(null, boundras);
      var minDec = Math.min.apply(null, bounddecs); 
      var maxDec = Math.max.apply(null, bounddecs);

      var lonrange = [minRa-2,maxRa+2];
      var latrange = [minDec-2,maxDec+2];    
  
      var mytrace = [
        {
          type: 'scattergeo',
          mode: 'markers',
          name: 'Mag < 2',
          lon: ras1, 
          lat: decs1,
          text: hovs1,
          hoverinfo: 'text',
          marker: {
            symbol: 'star-open',
            size: 20,
            color: 'black',
          },            
        },
        {
          type: 'scattergeo',
          mode: 'markers',
          name: 'Mag < 3',
          lon: ras2, 
          lat: decs2,
          text: hovs2,
          hoverinfo: 'text',
          marker: {
            symbol: 'octagon-open',
            size: 13,
            color: 'darkgrey',
          },                 
        },
        {
          type: 'scattergeo',
          mode: 'markers',
          name: 'Mag < 4',
          lon: ras3, 
          lat: decs3,
          text: hovs3,
          hoverinfo: 'text',
          marker: {
            symbol: 'hexagram-open',
            size: 8,
            color: 'middlegrey',
          },                
        },
        {
          type: 'scattergeo',
          mode: 'markers',
          name: 'Mag < 5',
          lon: ras4, 
          lat: decs4,
          hoverinfo: 'skip',
          marker: {
            symbol: 'hexagram',
            size: 5,
            color: 'grey',
          },                  
        },
        {
          type: 'scattergeo',
          mode: 'markers',
          name: 'Mag < 6',
          lon: ras5, 
          lat: decs5,
          hoverinfo: 'skip',
          marker: {
            symbol: 'circle',
            size: 3,
            color: 'lightgrey',
          },                  
        },
        {
          type: 'scattergeo',
          mode: 'markers',
          name: 'Mag < 7',
          lon: ras6, 
          lat: decs6,
          hoverinfo: 'skip',
          marker: {
            symbol: 'circle-open',
            size: 2,
            color: 'lightgrey',
          },                 
        },

        {
            type: 'scattergeo',
            mode: 'markers',
            name: 'boundary',
            lon: boundras,
            lat: bounddecs,
            hoverinfo: 'skip', 
            marker: {
              symbol: 'circle',
              size: 3,
            },            
        }];

        var mylayout = {
          title: '<b>Sky map for '+Csn[l]+'</b><br>Stars < 7 magnitude',
          autosize: false,
          geo: {
              projection:{
                type: 'azimuthal equidistant'
              },
              lonaxis: {
                  showgrid: true,
                  dtick: 5,
                  gridcolor: "#aaa",
                  gridwidth: 1,
                  range: lonrange,            
              },
              lataxis: {
                  showgrid: true,
                  dtick: 5,
                  gridcolor: "#aaa",
                  gridwidth: 1,
                  range: latrange,          
              },
              showcoastlines: false,
              showland: false,
              showrivers: false,
              showlakes: false,
              showocean: false,
              showcountries: false,
              showsubunits: false
          },
          showlegend: true, 
      };

      Plotly.newPlot('skymap'+Cs[l], mytrace, mylayout);
    }
  });  
});



