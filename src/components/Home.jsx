export default function Home({ onStart }) {
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="home-content">
          <h1>マルチアングル画像PDFジェネレータ</h1>
          <button className="btn btn-primary btn-large" onClick={onStart}>
            今すぐ始める
          </button>
        </div>
      </header>

      <section className="how-to">
        <h2>使い方</h2>
        <ol className="steps">
          <li>
            <strong>画像を選択</strong>
            <p>2枚、4枚、または8枚の画像をドラッグ&ドロップで選択</p>
          </li>
          <li>
            <strong>レイアウトを選択</strong>
            <p>複数のレイアウトパターンから、お好みのものを選択</p>
          </li>
          <li>
            <strong>オプションを設定</strong>
            <p>タイトルと日付（オプション）を入力</p>
          </li>
          <li>
            <strong>ダウンロード</strong>
            <p>PDF または PNG をダウンロード</p>
          </li>
        </ol>
      </section>

      <section className="features">
        <h2>機能</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🖼️</div>
            <h3>複数レイアウト対応</h3>
            <p>2枚、4枚、8枚の画像に対応。複数の配置パターンから選択可能</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📄</div>
            <h3>PDF/PNG出力</h3>
            <p>16:9アスペクト比で自動生成。PDFまたはPNG形式で出力</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">✨</div>
            <h3>リアルタイムプレビュー</h3>
            <p>配置を編集しながらプレビューを確認できます</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏷️</div>
            <h3>メタデータ対応</h3>
            <p>タイトルと日付をオプションで追加。On/Off切り替え可能</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>ブラウザで完結</h3>
            <p>インストール不要。ブラウザで画像を選択してすぐに生成</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🆓</div>
            <h3>完全無料</h3>
            <p>オープンソース。データはブラウザ内で処理されます</p>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <p>
          <a href="https://github.com/t0rry/Gen_MultiAnglePDF" target="_blank" rel="noopener noreferrer">
            GitHub で見る
          </a>
        </p>
        <p className="copyright">© 2024 マルチアングル画像PDFジェネレータ</p>
      </footer>
    </div>
  )
}
