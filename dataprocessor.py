from collections import OrderedDict
from itertools import groupby
import collections
import csv
import numpy as np

constellations=[]
absoluteMagnitudes=[]
colorIndices=[]
names=[]
distances=[]
ras=[]
decs=[]
mags=[]
spects=[]

def round25(x):
	return round(x*4)/4

def round10(x):
	return round(x*10)/10

def round05(x):
	return round(x*20)/20

with open('hygdata_v3.csv') as csvfile:
	hygreader = csv.DictReader(csvfile, delimiter=',')
	countColorIndexUnknown =0
	countConstellationUnknown = 0
	countDistanceUnknown = 0
	countDiscard = 0
	index = 0
	for row in hygreader:
		index+=1;
		if row['con'] is '':
			countConstellationUnknown+=1
		if row['dist']=='100000.0000':
			countDistanceUnknown+=1
		if row['ci'] is '':
			countColorIndexUnknown+=1
		if row['con'] is '' or row['dist']=='100000.0000' or row['ci'] is '':
			countDiscard+=1
		else:
			constellations.append(row['con'])
			absoluteMagnitudes.append(float(row['absmag']))
			colorIndices.append(float(row['ci']))
			mags.append(float(row['mag']))
			spects.append(row['spect'])
			ras.append(float(row['ra']))
			decs.append(float(row['dec']))
			distances.append(float(row['dist']))
			if (row['proper'] is not ''):
				names.append(row['proper'])
			elif (row['gl'] is not ''):
				names.append(row['gl'])
			elif (row['bf'] is not ''):
				names.append(row['bf'])
			elif (row['hr'] is not ''):
				names.append('hr'+row['hr'])
			elif (row['hd'] is not ''):
				names.append('hd'+row['hd'])
			else:
				names.append('')		 

constellationCodes=sorted(list(OrderedDict.fromkeys(constellations)))
constellationNames=[]
with open('constellation_names.csv') as csvfile:
	constellationsReader = csv.DictReader(csvfile, delimiter=',')
	for row in constellationsReader:
		constellationNames.append(row['name'])

constellationDictionary = dict(zip(constellationCodes, constellationNames))

boundName=[];
boundRa=[];
boundDec=[]
with open('bound_20.csv') as csvfile:
	boundReader = csv.DictReader(csvfile, delimiter=',');
	for row in boundReader:
		boundName.append(row['name'])
		ra_tmp = float(row['ra']);
		boundRa.append(ra_tmp*15.0)
		boundDec.append(float(row['dec']))

minAbsMag = float("{0:.2f}".format(max(absoluteMagnitudes)))
meanAbsMag = float("{0:.2f}".format(np.mean(absoluteMagnitudes)))
stdAbsMag = float("{0:.2f}".format(np.std(absoluteMagnitudes)))
maxAbsMag = float("{0:.2f}".format(min(absoluteMagnitudes)))
minCi = float("{0:.2f}".format(min(colorIndices)))
meanCi = float("{0:.2f}".format(np.mean(colorIndices)))
stdCi = float("{0:.2f}".format(np.std(colorIndices)))
maxCi = float("{0:.2f}".format(max(colorIndices)))
usePercentage = float("{0:.2f}".format((index-countDiscard)*100.00/index))
discardPercentage = float("{0:.2f}".format(countDiscard*100.00/index))
print 'Constellation unknown: '+str(countConstellationUnknown)
print 'Distance unknown: '+str(countDistanceUnknown)
print 'Absolute magnitude range (min, mean, std, max): '+str(minAbsMag)+', '+str(meanAbsMag)+', '+str(stdAbsMag)+', '+str(maxAbsMag)
print 'B-V range (min, mean, std, max): '+str(minCi)+', '+str(meanCi)+', '+str(stdCi)+', '+str(maxCi)
print 'Original sample size: '+str(index)
print 'Data to use: '+ str(index-countDiscard)+' ('+str(usePercentage)+'%)'
print 'Data to discard: '+str(countDiscard)+' ('+str(discardPercentage)+'%)'

w, h = 8,88
dataPerConstellation = [[0 for x in range(w)] for y in range(h)]
starsInConstellation = [0]*88
cmsPerConstellation = []
ciInConstellation = []
absmagInConstellation = []
for idx, code in enumerate(constellationCodes):
    for jdx, raw in enumerate(constellations):
    	if (raw==code):
    		starsInConstellation[idx]+=1
    		ciInConstellation.append(colorIndices[jdx])
    		absmagInConstellation.append(absoluteMagnitudes[jdx])
    		cmsPerConstellation.append([code, round(absoluteMagnitudes[jdx],0), round10(colorIndices[jdx])])
    dataPerConstellation[idx][0]=np.min(ciInConstellation)
    dataPerConstellation[idx][1]=np.mean(ciInConstellation)
    dataPerConstellation[idx][2]=np.std(ciInConstellation)
    dataPerConstellation[idx][3]=np.max(ciInConstellation)
    dataPerConstellation[idx][4]=np.min(absmagInConstellation)
    dataPerConstellation[idx][5]=np.mean(absmagInConstellation)
    dataPerConstellation[idx][6]=np.std(absmagInConstellation)
    dataPerConstellation[idx][7]=np.max(absmagInConstellation)
    ciInConstellation=[]
    absmagInConstellation=[]

constellationFrequency = dict(zip(constellationCodes, starsInConstellation))

cmsPerConstellation.sort()
cmsPerConstellationFrequency = [len(list(group)) for key, group in groupby(cmsPerConstellation)]

cmsPerConstellationValuesSet = set(tuple(x) for x in cmsPerConstellation)
cmsPerConstellationValues = [ list(x) for x in cmsPerConstellationValuesSet ]
cmsPerConstellationValues.sort()

constellationData = [['constellation','name','numberOfStars','ciMin','ciMean','ciStd','ciMax','absmagMin','absmagMean','absmagStd','absmagMax']]
constellationData.append(['All','Total', index-countDiscard, minCi, meanCi, stdCi, maxCi, maxAbsMag, meanAbsMag, stdAbsMag, minAbsMag])
for idx, code in enumerate(constellationCodes):
	nameT = constellationNames[idx]
	numberOfStarsT = constellationFrequency[code]
	ciMinT = str(dataPerConstellation[idx][0])
	ciMeanT = str(dataPerConstellation[idx][1])
	ciStdT = str(dataPerConstellation[idx][2])
	ciMaxT = str(dataPerConstellation[idx][3])
	absmagMinT = str(dataPerConstellation[idx][4])
	absmagMeanT = str(dataPerConstellation[idx][5])
	absmagStdT = str(dataPerConstellation[idx][6])
	absmagMaxT = str(dataPerConstellation[idx][7])
	constellationData.append([code,nameT,numberOfStarsT,ciMinT,ciMeanT, ciStdT, ciMaxT, absmagMinT, absmagMeanT, absmagStdT, absmagMaxT])

csvfileOut = open('constellation_data.csv', 'w')
with csvfileOut:
    cmWriter = csv.writer(csvfileOut)
    cmWriter.writerows(constellationData)

processedData = [['constellation','name','ra','dec','mag','distance','absmag','ci','spect']]
processedDataMag7 = [['constellation','name','ra','dec','mag','distance','absmag','ci','spect']]
for idx, name in enumerate(names):
	processedData.append([constellations[idx], names[idx], ras[idx], decs[idx], mags[idx], distances[idx], absoluteMagnitudes[idx], colorIndices[idx], spects[idx]])
	if mags[idx]<7:
		processedDataMag7.append([constellations[idx], names[idx], ras[idx], decs[idx], mags[idx], distances[idx], absoluteMagnitudes[idx], colorIndices[idx], spects[idx]])

csvfileOut = open('processed_data.csv', 'w')
with csvfileOut:
    cmWriter = csv.writer(csvfileOut)
    cmWriter.writerows(processedData)

csvfileOut = open('processed_data_lower_mag_7.csv', 'w')
with csvfileOut:
    cmWriter = csv.writer(csvfileOut)
    cmWriter.writerows(processedDataMag7)

binnedData=[['constellation','absmag','ci','frequency','percentage']]
for idx, freq in enumerate(cmsPerConstellationFrequency):
	constellationT = cmsPerConstellationValues[idx][0]
	absmagT = str(cmsPerConstellationValues[idx][1])
	ciT = str(cmsPerConstellationValues[idx][2])
	percentageT = str(round(freq*100.00/constellationFrequency[cmsPerConstellationValues[idx][0]],3))
   	binnedData.append([constellationT, absmagT, ciT, freq, percentageT])    

csvfileOut = open('colormagnitude_data_binned.csv', 'w')
with csvfileOut:
    cmWriter = csv.writer(csvfileOut)
    cmWriter.writerows(binnedData)
	