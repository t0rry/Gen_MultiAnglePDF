import { useEffect, useRef, useState } from 'react'
import { PDFDocument, rgb } from 'pdf-lib'

export default function PDFGenerator({ images, layoutType, title, date, outputFormat, isPreview }) {
  const canvasRef = useRef(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (!images.length || !layoutType) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const canvasWidth = 1920
    const canvasHeight = 1080

    canvas.width = canvasWidth
    canvas.height = canvasHeight

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvasWidth, canvasHeight)

    const padding = 60
    const contentHeight = canvasHeight - padding * 2 - (title || date ? 120 : 0)
    const contentWidth = canvasWidth - padding * 2

    let imageAreas = []

    if (layoutType === '2-side-by-side') {
      const imgWidth = (contentWidth - 20) / 2
      const imgHeight = contentHeight
      imageAreas = [
        { x: padding, y: padding + (title || date ? 120 : 0), w: imgWidth, h: imgHeight },
        { x: padding + imgWidth + 20, y: padding + (title || date ? 120 : 0), w: imgWidth, h: imgHeight }
      ]
    } else if (layoutType === '4-grid') {
      const imgWidth = (contentWidth - 20) / 2
      const imgHeight = (contentHeight - 20) / 2
      imageAreas = [
        { x: padding, y: padding + (title || date ? 120 : 0), w: imgWidth, h: imgHeight },
        { x: padding + imgWidth + 20, y: padding + (title || date ? 120 : 0), w: imgWidth, h: imgHeight },
        { x: padding, y: padding + imgHeight + 20 + (title || date ? 120 : 0), w: imgWidth, h: imgHeight },
        { x: padding + imgWidth + 20, y: padding + imgHeight + 20 + (title || date ? 120 : 0), w: imgWidth, h: imgHeight }
      ]
    } else if (layoutType === '4-side-by-side') {
      const imgWidth = (contentWidth - 60) / 4
      const imgHeight = contentHeight
      for (let i = 0; i < 4; i++) {
        imageAreas.push({
          x: padding + i * (imgWidth + 20),
          y: padding + (title || date ? 120 : 0),
          w: imgWidth,
          h: imgHeight
        })
      }
    } else if (layoutType === '8-grid') {
      const imgWidth = (contentWidth - 20) / 4
      const imgHeight = (contentHeight - 20) / 2
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 4; col++) {
          imageAreas.push({
            x: padding + col * (imgWidth + 20),
            y: padding + row * (imgHeight + 20) + (title || date ? 120 : 0),
            w: imgWidth,
            h: imgHeight
          })
        }
      }
    } else if (layoutType === '8-side-by-side') {
      const imgWidth = (contentWidth - 140) / 8
      const imgHeight = (contentHeight - 20) / 2
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 8; col++) {
          imageAreas.push({
            x: padding + col * (imgWidth + 20),
            y: padding + row * (imgHeight + 20) + (title || date ? 120 : 0),
            w: imgWidth,
            h: imgHeight
          })
        }
      }
    }

    // すべての画像の読み込みを待つ
    console.log('Starting to load images:', images.length)
    const imagePromises = images.map((image, index) => {
      return new Promise((resolve) => {
        if (index >= imageAreas.length) {
          console.log(`Image ${index}: skipped (no area)`)
          resolve()
          return
        }
        const area = imageAreas[index]
        const img = new Image()
        img.crossOrigin = 'anonymous'
        img.onload = () => {
          console.log(`Image ${index} loaded:`, { width: img.width, height: img.height })
          const ratio = Math.min(area.w / img.width, area.h / img.height)
          const w = img.width * ratio
          const h = img.height * ratio
          const x = area.x + (area.w - w) / 2
          const y = area.y + (area.h - h) / 2
          ctx.drawImage(img, x, y, w, h)
          console.log(`Image ${index} drawn at:`, { x, y, w, h })
          resolve()
        }
        img.onerror = (error) => {
          console.error(`Image ${index} failed to load:`, error)
          resolve()
        }
        console.log(`Image ${index}: loading from`, image.src?.substring(0, 50))
        img.src = image.src
      })
    })

    Promise.all(imagePromises).then(() => {
      if (title || date) {
        ctx.fillStyle = '#000'

        if (title) {
          ctx.font = 'bold 48px Arial'
          ctx.textAlign = 'left'
          ctx.fillText(title, padding, padding + 50)
        }

        if (date) {
          ctx.font = '20px Arial'
          ctx.textAlign = 'right'
          ctx.fillText(date, canvasWidth - padding, canvasHeight - 30)
        }
      }

      try {
        const url = canvas.toDataURL('image/png')
        console.log('Canvas rendered successfully', { width: canvas.width, height: canvas.height })
        setPreviewUrl(url)
      } catch (error) {
        console.error('Failed to generate preview:', error)
      }
    }).catch(error => {
      console.error('Error loading images:', error)
    })
  }, [images, layoutType, title, date])

  const generateOutput = async () => {
    if (!canvasRef.current || !images.length) return

    const canvas = canvasRef.current

    if (outputFormat === 'png') {
      const link = document.createElement('a')
      link.href = canvas.toDataURL('image/png')
      link.download = `model-${Date.now()}.png`
      link.click()
    } else {
      // PDF生成
      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([1920, 1080])

      // キャンバスをPNGに変換
      const pngData = canvas.toDataURL('image/png')
      const pngImage = await pdfDoc.embedPng(pngData)

      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: 1920,
        height: 1080
      })

      const pdfBytes = await pdfDoc.save()
      const link = document.createElement('a')
      link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))
      link.download = `model-${Date.now()}.pdf`
      link.click()
    }
  }

  return (
    <>
      {isPreview ? (
        <div className="preview-container">
          {previewUrl && <img src={previewUrl} alt="Preview" className="preview-image" />}
          {!previewUrl && <div className="preview-placeholder">プレビュー読み込み中...</div>}
        </div>
      ) : (
        <div>
          <button className="btn btn-primary" onClick={generateOutput}>
            {outputFormat === 'pdf' ? 'PDFをダウンロード' : 'PNGをダウンロード'}
          </button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  )
}
