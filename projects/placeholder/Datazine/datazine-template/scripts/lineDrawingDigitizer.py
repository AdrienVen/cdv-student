# -*- coding: utf-8 -*-
"""
Created on Mon Nov  2 21:53:48 2020

@author: adven
"""

from PIL import Image, ImageOps
from IPython.display import display
import numpy as np

def digitize(array):
    array = array.copy()
    for i in range(len(array)):
        for j in range(len(array[i])):
            color = array[i,j]
                
            if color <= 122:
                array[i,j] = 255
                
            else:
                array[i,j] = 0
    return array
    
    
path = "C:\\Users\\adven\\Desktop\\Crit. Data\\cdv-student\projects\placeholder\Datazine\datazine-template\\assets\Middle.jpg"
img = Image.open(path)
img = img.copy()
gray_img = ImageOps.grayscale(img)

img_data = np.asarray(gray_img)
digitized = np.asarray(digitize(img_data))
unique_elements, counts_elements = np.unique(digitized, return_counts=True)
new_img = Image.fromarray(digitized)
new_img.show()


