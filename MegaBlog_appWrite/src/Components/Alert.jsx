import React from 'react'
import '../index.css';
function Alert() {
  return (
      <div id="error_alert" class="fixed inset-0 z-50 items-center justify-center hidden bg-black/60 backdrop-blur-sm">
        <div class="max-w-sm p-8 text-center bg-white border-t-4 border-indigo-400 shadow-2xl rounded-3xl">
            <h2 class="mb-2 text-xl font-bold">Post master says:</h2>
            <p id="error_alert_text" class="mb-6 text-neutral-600"></p>
            <button class="... cursor-pointer ... bg-neutral-900 text-white px-6 py-2 rounded-xl hover:bg-indigo-400"
                id="close_btn">Got it!</button>
        </div>
    </div>
   )
}

export default Alert