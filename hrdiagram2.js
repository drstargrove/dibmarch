cis=[];
absmags=[];
constellations=[];
frequency=[]
percentages=[]
hm=[]

Plotly.d3.csv("colormagnitude_data_binned.csv", function(data1){
  Plotly.d3.csv("processed_data_lower_mag_7.csv", function(data2){
    Cs = ['Mic', 'Mon', 'Mus', 'Nor', 'Oct', 'Oph', 'Ori', 'Pav', 'Peg', 'Per', 'Phe', 'Pic', 'PsA', 'Psc', 'Pup', 'Pyx', 'Ret', 'Scl', 'Sco', 'Sct', 'Ser', 'Sex', 'Sge', 'Sgr', 'Tau', 'Tel', 'TrA', 'Tri', 'Tuc', 'UMa', 'UMi', 'Vel', 'Vir', 'Vol', 'Vul'];
    Csn = ['Microscopium', 'Monoceros', 'Musca', 'Norma', 'Octans', 'Ophiuchus', 'Orion', 'Pavo', 'Pegasus', 'Perseus', 'Phoenix', 'Pictor', 'Pisces', 'Piscis Austrinus', 'Puppis', 'Pyxis', 'Reticulum', 'Sagitta', 'Sagittarius', 'Scorpius', 'Sculptor', 'Scutum', 'Serpens', 'Sextans', 'Taurus', 'Telescopium', 'Triangulum', 'Triangulum Australe', 'Tucana', 'Ursa Major', 'Ursa Minor', 'Vela', 'Virgo', 'Volans', 'Vulpecula '];
    for (var l=0;l<Cs.length;l++) {
      var absmags1=[],absmags2=[],absmags3=[],absmags4=[],absmags5=[],absmags6=[];
      var cis1=[],cis2=[],cis3=[],cis4=[],cis5=[],cis6=[];
      var con1=[],con2=[],con3=[],con4=[],con5=[],con6=[];
      var hovs1=[],hovs2=[],hovs3=[];
      for( var i=0;i<data2.length;i++){
        var constel = data2[i].constellation;
        var magnitude=parseFloat(data2[i].mag);
        var absmagnitude=parseFloat(data2[i].absmag)
        var colorIndex=parseFloat(data2[i].ci)
        var ra_txt=parseFloat(data2[i].ra * -15)
        var ra_tmp=ra_txt;
        var dec_tmp=parseFloat(data2[i].dec);
        var spect=data2[i].spect;
        var distance = parseFloat(data2[i].distance);
        var hovertext_tmp = "<b>"+data2[i].name+"</b><br>( RA: "+ra_txt.toFixed(2)*-1+"°, Dec: "+dec_tmp.toFixed(2)+"° )<br>Mag: "+magnitude+"<br>Abs Mag: "+absmagnitude+"<br>B-V: "+colorIndex+"<br>Type: "+ spect+"<br>Distance: "+distance+"pc";
        
        if (constel == Cs[l]) {
          if (magnitude >= 6 & magnitude <7){
            absmags6.push(absmagnitude);
            cis6.push(colorIndex);
            con6.push(constel);
          }
          if (magnitude >= 5 & magnitude <6){
            absmags5.push(absmagnitude);
            cis5.push(colorIndex);
            con5.push(constel)
          }
          if (magnitude >= 4 & magnitude <5){
            absmags4.push(absmagnitude);
            cis4.push(colorIndex);
            con4.push(constel)
          }   
          if (magnitude >= 3 & magnitude <4){
            absmags3.push(absmagnitude);
            cis3.push(colorIndex);
            hovs3.push(hovertext_tmp);
            con3.push(constel)
          }
          if (magnitude >= 2 & magnitude < 3){
            absmags2.push(absmagnitude);
            cis2.push(colorIndex);
            hovs2.push(hovertext_tmp);
            con2.push(constel)
          }
          if (magnitude < 2){
            absmags1.push(absmagnitude);
            cis1.push(colorIndex);
            hovs1.push(hovertext_tmp);
            con1.push(constel);
          }
        }
      }
    
      cis=[];absmags=[];constellations=[];percentages=[]; 

      for( var j=0;j<data1.length;j++){
        var ci=parseFloat(data1[j].ci);
        var absmag=parseFloat(data1[j].absmag);
        var frequency=parseFloat(data1[j].frequency);
        var percentage=parseFloat(data1[j].percentage);
        var constellation=data1[j].constellation;
        if (constellation == Cs[l]){
          cis.push(ci);
          absmags.push(absmag);
          constellations.push(constellation);
          percentages.push(percentage);
        }
      }

      var trace1 = {
        z: percentages,
        x: cis,
        y: absmags,
        type: 'heatmap',
        colorscale: 'Hot',
        reversescale: true,
        connectgaps: false,
        hoverinfo: 'skip',
        colorbar: {
          x: 0.90,
          y: 0.5,
          thickness: 10,
          tick0: 0,
          dtick: 0.2,
          tickmode: 'array',
          thicknessmode: 'pixels',
          lenmode: 'fraction',
          len: 0.70,
          outlinewidth: 1,
          title: 'Percentage of stars (%)',
          titleside: 'right'
        }
      };

      var trace2 = {
        type: 'scatter',
        mode: 'markers',
        name: 'Mag < 2',
        x: cis1, 
        y: absmags1,
        text: hovs1,
        hoverinfo: 'text',
        marker: {
          symbol: 'star-open',
          size: 20,
          color: 'black',
        },
      };

      var trace3 = {
        type: 'scatter',
        mode: 'markers',
        name: 'Mag < 3',
        x: cis2, 
        y: absmags2,
        text: hovs2,
        hoverinfo: 'text',
        marker: {
          symbol: 'octagon-open',
          size: 13,
          color: 'darkgrey',
        },
      };

      var trace4 = {
        type: 'scatter',
        mode: 'markers',
        name: 'Mag < 4',
        x: cis3, 
        y: absmags3,
        text: hovs3,
        hoverinfo: 'text',
        marker: {
          symbol: 'hexagram-open',
          size: 8,
          color: 'middlegrey',
        },
      };

      var trace5 = {
        type: 'scatter',
        mode: 'markers',
        name: 'Mag < 5',
        x: cis4, 
        y: absmags4,
        hoverinfo: 'skip',
        marker: {
          symbol: 'hexagram',
          size: 5,
          color: 'grey',
        },
      };

      var trace6 = {
        type: 'scatter',
        mode: 'markers',
        name: 'Mag < 6',
        x: cis5, 
        y: absmags5,
        hoverinfo: 'skip',
        marker: {
            symbol: 'circle',
            size: 3,
            color: 'lightgrey',
          },  
      };

      var data = [trace1,trace2,trace3,trace4,trace5,trace6];

      var layout = {
        title: '<b>Color-magnitude diagram for '+Csn[l]+'</b><br>Stellar density heatmap combined with scatter-plot of stars < 6 magnitude',
        xaxis: {
          showgrid: false,
          zeroline: false,
          showline: false,
          title: 'Color (B-V)',
          range: [-0.5,2.5],
        },
        yaxis: {
          autorange: 'reversed',
          showgrid: false,
          zeroline: false,
          showline: false,
          title: 'Absolute magnitude',
          range: [-7.3, 15.5]
        },      
        legend: {
          x:1.05,
          y:0.75,
          traceorder:'normal',
          tracegroupgap: 60,
          yanchor: 'auto',
        },
      }

      Plotly.newPlot('hrdiagram'+Cs[l], data, layout);
    }
  }); 
});