import { useState } from 'react'

export default function ImageSelector({ onImagesSelected }) {
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = (files) => {
    const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'))

    if (imageFiles.length === 0) {
      alert('画像ファイルを選択してください')
      return
    }

    if (![2, 4, 8].includes(imageFiles.length)) {
      alert('2枚、4枚、または8枚の画像を選択してください')
      return
    }

    const readers = imageFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = new Image()
          img.onload = () => {
            resolve({
              src: e.target.result,
              width: img.width,
              height: img.height,
              name: file.name
            })
          }
          img.src = e.target.result
        }
        reader.readAsDataURL(file)
      })
    })

    Promise.all(readers).then(images => {
      onImagesSelected(images)
    })
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    handleFiles(e.dataTransfer.files)
  }

  const handleChange = (e) => {
    handleFiles(e.target.files)
  }

  return (
    <div className="image-selector">
      <div
        className={`drop-zone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="drop-content">
          <svg className="drop-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          <h2>画像をドラッグ&ドロップ</h2>
          <p>または下のボタンで選択</p>
          <p className="hint">2枚、4枚、または8枚の画像を選択してください</p>
        </div>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="file-input"
        />
      </div>
    </div>
  )
}
