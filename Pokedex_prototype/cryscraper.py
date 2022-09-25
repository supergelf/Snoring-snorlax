from ctypes import create_unicode_buffer
from os import remove
from turtle import clear
from bs4 import BeautifulSoup
import requests

URL = "https://play.pokemonshowdown.com/audio/cries/?C=N;O=A"
page = requests.get(URL)

headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0",
           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
           "Accept-Language": "en-US,en;q=0.9"
           }


soup = BeautifulSoup(page.content, "html.parser")

results = soup.find_all("td")
liste = []

for cries in results:
    cry_a = cries.find("a")

    if cry_a != None:
        liste.append(cry_a)
        cry_link = cry_a["href"]

        if ('.mp3') not in cry_link:
            liste.remove(cry_a)
                    

                
        else:
            mp3_data = requests.get(url="https://play.pokemonshowdown.com/audio/cries/" + cry_link, headers=headers).content
            with open('./cries/'+ cry_link, 'wb') as handler:
                handler.write(mp3_data)
            


#print(liste)
