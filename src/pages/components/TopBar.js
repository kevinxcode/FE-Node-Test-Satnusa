// FloatingButton.js
import React from "react";

const TopBar = ({ data }) => {
  return (
    <div
    class="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-blue-900 px-6  justify-between lg:justify-end">
  
    <form action="" enctype="multipart/form-data" method="POST">
        <button
            class="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
              Sign In
            </button>
    </form>
</div>
   );
};

export default TopBar;
