import styles from '../src/js/style'
import {facilityPermanent,facilityFinancial,facilityCultural,lineFeature,stationFeature} from './feature.mock'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'
import Circle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Icon from 'ol/style/Icon'
import lookup from '../src/js/lookup'

describe('featureStyle', () => {
   // const style = styleFn()
  test('featureStyle - permanent', () => {
    let style = styles.featureStyle(facilityPermanent, 152.8740565703525)
    expect(style[1].getImage() instanceof Icon).toBe(true)
    expect(style[1].getImage().getSrc()).toBe('img/building-15.svg')
    expect(style[1].getImage().getScale()).toBe((12 / 15))
    
    // z > 11
    style = styles.featureStyle(facilityPermanent, 38.21851414258813)
    expect(style[1].getImage().getScale()).toBe((16 / 15))

    // z > 13
    style = styles.featureStyle(facilityPermanent, 9.554628535647032)
    expect(style[1].getImage().getScale()).toBe((24 / 15))

    // z > 15
    style = styles.featureStyle(facilityPermanent, 2.388657133911758)
    expect(style[1].getImage().getScale()).toBe((32 / 15))
    
    // z > 17
    style = styles.featureStyle(facilityPermanent, 0.5971642834779395)
    expect(style[1].getImage().getScale()).toBe((40 / 15))

  })
  test('featureStyle - financial', () => {
    let style = styles.featureStyle(facilityFinancial, 152.8740565703525)
    expect(style[1].getImage() instanceof Icon).toBe(true)
    expect(style[1].getImage().getSrc()).toBe('img/bank-15.svg')
    expect(style[1].getImage().getScale()).toBe((12 / 17))
    
    // z > 11
    style = styles.featureStyle(facilityFinancial, 38.21851414258813)
    expect(style[1].getImage().getScale()).toBe((16 / 17))

    // z > 13
    style = styles.featureStyle(facilityFinancial, 9.554628535647032)
    expect(style[1].getImage().getScale()).toBe((24 / 17))

    // z > 15
    style = styles.featureStyle(facilityFinancial, 2.388657133911758)
    expect(style[1].getImage().getScale()).toBe((32 / 17))
    
    // z > 17
    style = styles.featureStyle(facilityFinancial, 0.5971642834779395)
    expect(style[1].getImage().getScale()).toBe((40 / 17))
  })
  test('featureStyle - cultural', () => {
    let style = styles.featureStyle(facilityCultural, 152.8740565703525)
    expect(style[1].getImage() instanceof Icon).toBe(true)
    expect(style[1].getImage().getSrc()).toBe('img/stadium-15.svg')
    expect(style[1].getImage().getScale()).toBe((12 / 15))
    
    // z > 11
    style = styles.featureStyle(facilityCultural, 38.21851414258813)
    expect(style[1].getImage().getScale()).toBe((16 / 15))

    // z > 13
    style = styles.featureStyle(facilityCultural, 9.554628535647032)
    expect(style[1].getImage().getScale()).toBe((24 / 15))

    // z > 15
    style = styles.featureStyle(facilityCultural, 2.388657133911758)
    expect(style[1].getImage().getScale()).toBe((32 / 15))
    
    // z > 17
    style = styles.featureStyle(facilityCultural, 0.5971642834779395)
    expect(style[1].getImage().getScale()).toBe((40 / 15))
  })
})

describe('lineStyle', () => {
   // const style = styleFn()
   test('zoom <= 10', () => {
    let style = styles.lineStyle(lineFeature, 152.8740565703525)

    expect(style).toBeUndefined()
   })
   test('lineStyle - line does not exist in color lookup', () => {
    lineFeature.set('name', 'X')
    let style = styles.lineStyle(lineFeature, 38.21851414258813)

    expect(style.getStroke() instanceof Stroke).toBe(true)
    expect(style.getStroke().getColor()).toBe('#000')
    expect(style.getStroke().getWidth()).toBe(3 / 2)
    
    expect(style.getFill() instanceof Fill).toBe(true)
    expect(style.getFill().getColor()).toBe('rgba(0, 0, 0, 0)')

    expect(style).not.toBeUndefined()
    lineFeature.set('name', 'G')

   })
   test('lineStyle - line exists in color lookup', () => {
    let style = styles.lineStyle(lineFeature, 38.21851414258813)
    expect(style.getStroke() instanceof Stroke).toBe(true)
    expect(style.getStroke().getColor()).toBe('#98cd01')
    expect(style.getStroke().getWidth()).toBe(3 / 2)
    
    expect(style.getFill() instanceof Fill).toBe(true)
    expect(style.getFill().getColor()).toBe('rgba(0, 0, 0, 0)')

    expect(style).not.toBeUndefined()


    style = styles.lineStyle(lineFeature, 76.43702828517625)
    expect(style.getStroke().getWidth()).toBe(1)

    style = styles.lineStyle(lineFeature, 9.554628535647032)
    expect(style.getStroke().getWidth()).toBe(5 / 2)

    style = styles.lineStyle(lineFeature, 2.388657133911758)
    expect(style.getStroke().getWidth()).toBe(4)

    style = styles.lineStyle(lineFeature, 0.5971642834779395)
    expect(style.getStroke().getWidth()).toBe(6)

    style = styles.lineStyle(lineFeature, 0.29858214173896974)
    expect(style.getStroke().getWidth()).toBe(8)

    style = styles.lineStyle(lineFeature, 0.14929107086948487)
    expect(style.getStroke().getWidth()).toBe(9)

    style = styles.lineStyle(lineFeature, 0.074645535434742443)
    expect(style.getStroke().getWidth()).toBe(10)

    style = styles.lineStyle(lineFeature, 0.00933069192934280)
    expect(style.getStroke().getWidth()).toBe(10)
    
   })
})

describe('stationStyle', () => {
   // const style = styleFn()
   test('zoom <= 12', () => {
    let style = styles.stationStyle(stationFeature, 76.43702828517625)

    expect(style).toBeUndefined()
   })
   test('stationStyle', () => {
    let style = styles.stationStyle(stationFeature, 19.109257071294063)
    expect(style.getImage() instanceof Circle).toBe(true)

    expect(style.getImage().getRadius()).toBe(4)

    expect(style.getImage().getStroke() instanceof Stroke).toBe(true)
    expect(style.getImage().getStroke().getColor()).toBe('#000')
    expect(style.getImage().getStroke().getWidth()).toBe(2)
    
    expect(style.getImage().getFill() instanceof Fill).toBe(true)
    expect(style.getImage().getFill().getColor()).toBe('rgba(255,255,255,0.9)')

    expect(style).not.toBeUndefined()


    style = styles.stationStyle(stationFeature, 9.554628535647032)
    expect(style.getImage().getRadius()).toBe(6)

    style = styles.stationStyle(stationFeature, 2.388657133911758)
    expect(style.getImage().getRadius()).toBe(7)

    style = styles.stationStyle(stationFeature, 0.5971642834779395)
    expect(style.getImage().getRadius()).toBe(7)
    
   })
})