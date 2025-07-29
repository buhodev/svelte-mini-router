<div>
  <h2>Settings</h2>
  <p>Configure your application settings here.</p>
  
  <div class="settings-group">
    <h3>General</h3>
    <div class="setting">
      <label>
        <input type="checkbox" checked />
        Enable notifications
      </label>
    </div>
    <div class="setting">
      <label>
        <input type="checkbox" />
        Dark mode
      </label>
    </div>
  </div>
  
  <div class="settings-group">
    <h3>Privacy</h3>
    <div class="setting">
      <label>
        <input type="checkbox" checked />
        Share analytics data
      </label>
    </div>
  </div>
</div>

<style>
  div {
    padding: 1rem;
    background: white;
    border-radius: 4px;
    margin: 1rem 0;
  }
  
  h2 {
    color: #333;
    margin-top: 0;
  }
  
  .settings-group {
    margin: 1rem 0;
  }
  
  .settings-group h3 {
    color: #555;
    margin-bottom: 0.5rem;
    font-size: 1rem;
  }
  
  .setting {
    margin: 0.5rem 0;
  }
  
  .setting label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
  
  .setting input[type="checkbox"] {
    margin: 0;
  }
</style> 