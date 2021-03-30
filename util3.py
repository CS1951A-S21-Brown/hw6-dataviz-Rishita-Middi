import numpy as np
import pandas as pd
df=pd.read_csv('/Users/rishitamiddi/Desktop/hw6-dataviz-Rishita-Middi-main/data/video_games.csv')
arr1=df.Genre.unique()
arr2=df.Publisher.unique()

Sales_Global=[]

Publisher_list=[]
for i in arr1:
    Sales_Global.append(df.loc[df['Genre']==i,'Global_Sales'].max())
for j in Sales_Global:
    Publisher_list.append(df.loc[df['Global_Sales']==j,'Publisher'].iloc[0])


print(Publisher_list,Sales_Global,arr1)
print(arr1,arr2)
data={'Genre':arr1,'Global_Sales':Sales_Global,'Publisher':Publisher_list}

df = pd.DataFrame(data)
#print(df)
df.to_csv('/Users/rishitamiddi/Desktop/hw6-dataviz-Rishita-Middi-main/data/genre_publisher.csv')
