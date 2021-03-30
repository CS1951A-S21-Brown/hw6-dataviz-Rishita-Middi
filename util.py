
import numpy as np
import pandas as pd
df=pd.read_csv('/Users/rishitamiddi/Desktop/hw6-dataviz-Rishita-Middi-main/data/video_games.csv')
arr1=df.Genre.unique()
print(arr1)
total_NA=[]
total_EU=[]
total_JP=[]
for i in arr1:
    total_NA.append(df.loc[df['Genre']==i,'NA_Sales'].sum())
    total_EU.append(df.loc[df['Genre']==i,'EU_Sales'].sum())
    total_JP.append(df.loc[df['Genre']==i,'JP_Sales'].sum())


print(total_NA,total_EU,total_JP)

data={'Genre':arr1,'NA_sales':total_NA,'EU_sales':total_EU,'JP_sales':total_JP}

df = pd.DataFrame(data)
print(df)
df.to_csv('/Users/rishitamiddi/Desktop/hw6-dataviz-Rishita-Middi-main/data/genre_region.csv')
