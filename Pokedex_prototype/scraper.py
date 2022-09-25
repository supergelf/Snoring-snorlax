from random import sample
import string
import requests
import urllib.request
from bs4 import BeautifulSoup
import time

URL = "https://archives.bulbagarden.net/w/index.php?title=Category:Crystal_sprites&filefrom=%2A200%0ASpr+2c+200.png#mw-category-media"
page = requests.get(URL)

#print(page.text)


soup = BeautifulSoup(page.content, "html.parser")

results = soup.find(id="mw-category-media")


headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:60.0) Gecko/20100101 Firefox/60.0",
           "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
           "Accept-Language": "en-US,en;q=0.9"
           }

sprite_elements = results.find_all(class_="image")

for sprites in sprite_elements:
    sprite_img = sprites.find("img")
    
    sprite_link = sprite_img["src"]
    dex_num = sprite_link[ - 7:]
    if dex_num in ('_jp.png'):
        dex_num = sprite_link[ - 10:]

    if dex_num in ('201'):
        dex_num = sprite_link[ - 9:]

    img_data = requests.get(url=sprite_link, headers=headers).content
    with open('./sprites/'+ dex_num, 'wb') as handler:
        handler.write(img_data)

    