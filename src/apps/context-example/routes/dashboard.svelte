<div>
  <h2>Dashboard</h2>
  <p>This is the dashboard page.</p>
  <p>Each window instance maintains its own navigation state independently.</p>
  <div class="stats">
    <div class="stat">
      <h3>Active Users</h3>
      <p>1,234</p>
    </div>
    <div class="stat">
      <h3>Total Views</h3>
      <p>5,678</p>
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
  
  .stats {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .stat {
    flex: 1;
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 4px;
    text-align: center;
  }
  
  .stat h3 {
    margin: 0 0 0.5rem 0;
    color: #666;
    font-size: 0.9rem;
  }
  
  .stat p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: bold;
    color: #333;
  }
</style> 