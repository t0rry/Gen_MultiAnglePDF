import { useState } from 'react'
import Home from './components/Home'
import ImageSelector from './components/ImageSelector'
import PDFGenerator from './components/PDFGenerator'

export default function App() {
  const [showHome, setShowHome] = useState(true)
  const [images, setImages] = useState([])
  const [layoutType, setLayoutType] = useState(null)
  const [titleEnabled, setTitleEnabled] = useState(false)
  const [title, setTitle] = useState('')
  const [dateEnabled, setDateEnabled] = useState(false)
  const [date, setDate] = useState('')
  const [outputFormat, setOutputFormat] = useState('pdf')

  const handleImagesSelected = (selectedImages) => {
    setImages(selectedImages)
    if (selectedImages.length === 2) setLayoutType('2-side-by-side')
    else if (selectedImages.length === 4) setLayoutType('4-grid')
    else if (selectedImages.length === 8) setLayoutType('8-grid')
  }

  if (showHome) {
    return <Home onStart={() => setShowHome(false)} />
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-top">
          <div>
            <h1>マルチアングル画像PDFジェネレータ</h1>
            <p>CGモデルを複数の角度からPDFに変換</p>
          </div>
          <button
            className="btn-home"
            onClick={() => {
              setShowHome(true)
              setImages([])
              setTitle('')
              setDate('')
            }}
          >
            ← ホームに戻る
          </button>
        </div>
      </header>

      <main className="main-content">
        {images.length === 0 ? (
          <ImageSelector onImagesSelected={handleImagesSelected} />
        ) : (
          <div className="editor-container">
            <section className="preview-section">
              <h2>プレビュー</h2>
              <PDFGenerator
                images={images}
                layoutType={layoutType}
                title={titleEnabled ? title : ''}
                date={dateEnabled ? date : ''}
                outputFormat={outputFormat}
                isPreview={true}
              />
            </section>

            <section className="settings-section">
              <h2>設定</h2>

              <div className="form-group">
                <label>レイアウト</label>
                <select value={layoutType} onChange={(e) => setLayoutType(e.target.value)}>
                  {images.length === 2 && (
                    <option value="2-side-by-side">横並び</option>
                  )}
                  {images.length === 4 && (
                    <>
                      <option value="4-grid">2x2 グリッド</option>
                      <option value="4-side-by-side">横並び</option>
                    </>
                  )}
                  {images.length === 8 && (
                    <>
                      <option value="8-grid">2x4 グリッド</option>
                      <option value="8-side-by-side">横並び 2段</option>
                    </>
                  )}
                </select>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={titleEnabled}
                    onChange={(e) => setTitleEnabled(e.target.checked)}
                  />
                  <span>タイトル（オプション）</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="プロジェクト名など"
                  disabled={!titleEnabled}
                />
              </div>

              <div className="form-group">
                <div className="form-group-header">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={dateEnabled}
                      onChange={(e) => setDateEnabled(e.target.checked)}
                    />
                    <span>日付（オプション）</span>
                  </label>
                  <button
                    className="btn-today"
                    onClick={() => {
                      const today = new Date().toISOString().split('T')[0]
                      setDate(today)
                    }}
                    disabled={!dateEnabled}
                  >
                    Today
                  </button>
                </div>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  disabled={!dateEnabled}
                />
              </div>

              <div className="form-group">
                <label>出力形式</label>
                <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value)}>
                  <option value="pdf">PDF</option>
                  <option value="png">PNG</option>
                </select>
              </div>

              <div className="button-group">
                <PDFGenerator
                  images={images}
                  layoutType={layoutType}
                  title={titleEnabled ? title : ''}
                  date={dateEnabled ? date : ''}
                  outputFormat={outputFormat}
                  isPreview={false}
                />
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setImages([])
                    setTitle('')
                    setDate('')
                  }}
                >
                  リセット
                </button>
              </div>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
