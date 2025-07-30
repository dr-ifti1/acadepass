<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Acadepass Social Hub</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        /* Base Styles */
        :root {
            --primary: #4361ee;
            --secondary: #3f37c9;
            --accent: #f72585;
            --success: #4cc9f0;
            --warning: #ffbe0b;
            --dark: #1a1a2e;
            --light: #f8f9fa;
            --card-bg: rgba(255, 255, 255, 0.1);
            --text: #333;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background: linear-gradient(135deg, #1a1a2e, #16213e, #0f3460);
            background-size: 400% 400%;
            animation: gradientBG 15s ease infinite;
            color: white;
            min-height: 100vh;
        }
        
        @keyframes gradientBG {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            display: grid;
            grid-template-columns: 250px 1fr 300px;
            gap: 20px;
        }
        
        /* Header Styles */
        header {
            background: rgba(26, 26, 46, 0.9);
            backdrop-filter: blur(10px);
            padding: 15px 0;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .header-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 20px;
        }
        
        .logo {
            display: flex;
            align-items: center;
            font-size: 1.8rem;
            font-weight: bold;
        }
        
        .logo i {
            color: var(--success);
            margin-right: 10px;
            font-size: 2rem;
        }
        
        .social-nav {
            display: flex;
            gap: 20px;
        }
        
        .social-nav a {
            color: white;
            font-size: 1.5rem;
            transition: transform 0.3s ease;
        }
        
        .social-nav a:hover {
            transform: translateY(-3px);
            color: var(--accent);
        }
        
        .user-actions {
            display: flex;
            gap: 15px;
            align-items: center;
        }
        
        .user-badge {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(67, 97, 238, 0.3);
            padding: 8px 15px;
            border-radius: 30px;
            cursor: pointer;
        }
        
        .avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: var(--success);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 1.2rem;
        }
        
        .status {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #4ade80;
            margin-left: 5px;
        }
        
        .notification-bell {
            position: relative;
            font-size: 1.4rem;
        }
        
        .notification-count {
            position: absolute;
            top: -5px;
            right: -5px;
            background: var(--accent);
            color: white;
            font-size: 0.7rem;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        /* Sidebar Styles */
        .sidebar {
            background: rgba(26, 26, 46, 0.7);
            border-radius: 15px;
            padding: 20px;
            height: fit-content;
            position: sticky;
            top: 90px;
        }
        
        .sidebar-title {
            font-size: 1.2rem;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .sidebar-menu {
            list-style: none;
        }
        
        .sidebar-menu li {
            padding: 12px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .sidebar-menu li a {
            display: flex;
            align-items: center;
            gap: 10px;
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            transition: all 0.3s ease;
        }
        
        .sidebar-menu li a:hover, .sidebar-menu li a.active {
            color: white;
        }
        
        .sidebar-menu li a i {
            width: 25px;
        }
        
        .create-group-btn {
            display: block;
            width: 100%;
            background: var(--accent);
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            font-weight: 600;
            margin-top: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
        }
        
        .create-group-btn:hover {
            background: #e11d8d;
            transform: translateY(-2px);
        }
        
        /* Main Content Styles */
        .main-content {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .create-post {
            background: rgba(26, 26, 46, 0.7);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .post-input {
            display: flex;
            gap: 15px;
            margin-bottom: 15px;
        }
        
        .post-input .avatar {
            width: 50px;
            height: 50px;
        }
        
        .post-input textarea {
            flex: 1;
            background: rgba(10, 10, 20, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 15px;
            color: white;
            resize: none;
            min-height: 80px;
            font-size: 1rem;
        }
        
        .post-input textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
        }
        
        .post-actions {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .attachment-options {
            display: flex;
            gap: 15px;
        }
        
        .attachment-btn {
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            font-size: 1.2rem;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .attachment-btn:hover {
            color: var(--success);
        }
        
        .post-btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: 10px 25px;
            border-radius: 20px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .post-btn:hover {
            background: var(--secondary);
            transform: translateY(-2px);
        }
        
        .post {
            background: rgba(26, 26, 46, 0.7);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .post-header {
            display: flex;
            gap: 12px;
            margin-bottom: 15px;
        }
        
        .post-user {
            flex: 1;
        }
        
        .post-user h3 {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 5px;
        }
        
        .verified-badge {
            color: var(--success);
            font-size: 0.9rem;
        }
        
        .post-time {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.6);
        }
        
        .post-content {
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .post-media {
            margin-bottom: 15px;
            border-radius: 12px;
            overflow: hidden;
        }
        
        .post-media img, .post-media video {
            width: 100%;
            max-height: 500px;
            object-fit: cover;
        }
        
        .post-stats {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            color: rgba(255, 255, 255, 0.7);
            font-size: 0.9rem;
        }
        
        .post-actions {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            padding-top: 10px;
        }
        
        .post-action {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            background: none;
            border: none;
            color: rgba(255, 255, 255, 0.7);
            padding: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 8px;
        }
        
        .post-action:hover {
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }
        
        .post-action.active {
            color: var(--accent);
        }
        
        /* Right Sidebar Styles */
        .right-sidebar {
            background: rgba(26, 26, 46, 0.7);
            border-radius: 15px;
            padding: 20px;
            height: fit-content;
            position: sticky;
            top: 90px;
        }
        
        .online-friends {
            margin-bottom: 30px;
        }
        
        .friend-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .friend {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px;
            border-radius: 8px;
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .friend:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .friend .avatar {
            width: 40px;
            height: 40px;
            position: relative;
        }
        
        .friend .status {
            position: absolute;
            bottom: 0;
            right: 0;
            border: 2px solid var(--dark);
        }
        
        .friend-info {
            flex: 1;
        }
        
        .friend-info h4 {
            font-size: 1rem;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .friend-info p {
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .message-btn {
            background: rgba(67, 97, 238, 0.3);
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        
        .top-students {
            margin-top: 30px;
        }
        
        .student {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .student:last-child {
            border-bottom: none;
        }
        
        .student .avatar {
            width: 50px;
            height: 50px;
            font-size: 1.3rem;
        }
        
        .student-badge {
            background: var(--warning);
            color: var(--dark);
            font-size: 0.8rem;
            padding: 2px 8px;
            border-radius: 20px;
            font-weight: bold;
            margin-top: 5px;
        }
        
        /* Chat Modal */
        .chat-modal {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 350px;
            background: rgba(26, 26, 46, 0.95);
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            display: none;
            z-index: 1000;
        }
        
        .chat-header {
            background: var(--primary);
            color: white;
            padding: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .chat-header h3 {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .close-chat {
            background: none;
            border: none;
            color: white;
            font-size: 1.2rem;
            cursor: pointer;
        }
        
        .chat-messages {
            height: 300px;
            overflow-y: auto;
            padding: 15px;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .message {
            max-width: 80%;
            padding: 12px 15px;
            border-radius: 18px;
            position: relative;
        }
        
        .incoming {
            background: rgba(67, 97, 238, 0.3);
            align-self: flex-start;
            border-bottom-left-radius: 5px;
        }
        
        .outgoing {
            background: rgba(76, 201, 240, 0.3);
            align-self: flex-end;
            border-bottom-right-radius: 5px;
        }
        
        .message-time {
            font-size: 0.7rem;
            color: rgba(255, 255, 255, 0.6);
            text-align: right;
            margin-top: 5px;
        }
        
        .chat-input {
            display: flex;
            padding: 15px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            gap: 10px;
        }
        
        .chat-input input {
            flex: 1;
            background: rgba(10, 10, 20, 0.5);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 10px 15px;
            color: white;
        }
        
        .send-btn {
            background: var(--primary);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
        }
        
        /* Short Video Section */
        .shorts-container {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        
        .short-video {
            background: rgba(26, 26, 46, 0.7);
            border-radius: 15px;
            overflow: hidden;
            position: relative;
            height: 400px;
        }
        
        .short-video video {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .video-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            padding: 15px;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
        }
        
        .video-info {
            display: flex;
            gap: 10px;
            margin-top: 10px;
        }
        
        .video-actions {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            position: absolute;
            right: 15px;
            bottom: 80px;
        }
        
        .video-action {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: white;
        }
        
        .video-action i {
            font-size: 1.5rem;
            margin-bottom: 5px;
        }
        
        /* Responsive Design */
        @media (max-width: 992px) {
            .container {
                grid-template-columns: 1fr;
            }
            
            .sidebar, .right-sidebar {
                position: static;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header>
        <div class="header-container">
            <div class="logo">
                <i class="fas fa-graduation-cap"></i>
                <span>Acadepass Social</span>
            </div>
            
            <div class="social-nav">
                <a href="feed.html" title="Feed"><i class="fas fa-home"></i></a>
                <a href="shorts.html" title="Shorts"><i class="fas fa-play-circle"></i></a>
                <a href="groups.html" title="Groups"><i class="fas fa-users"></i></a>
                <a href="messages.html" title="Messages"><i class="fas fa-comments"></i></a>
            </div>
            
            <div class="user-actions">
                <div class="notification-bell">
                    <i class="fas fa-bell"></i>
                    <span class="notification-count">3</span>
                </div>
                <div class="user-badge">
                    <div class="avatar">JD</div>
                    <div>Dr. John Doe</div>
                    <div class="status"></div>
                </div>
            </div>
        </div>
    </header>
    
    <!-- Main Content -->
    <div class="container">
        <!-- Left Sidebar -->
        <div class="sidebar">
            <h3 class="sidebar-title">Groups</h3>
            <ul class="sidebar-menu">
                <li><a href="#" class="active"><i class="fas fa-book-medical"></i> NLE Study Group</a></li>
                <li><a href="#"><i class="fas fa-language"></i> HSK Mastery</a></li>
                <li><a href="#"><i class="fas fa-book"></i> English Learners</a></li>
                <li><a href="#"><i class="fas fa-heartbeat"></i> Medical Students</a></li>
                <li><a href="#"><i class="fas fa-graduation-cap"></i> Top Students Club</a></li>
            </ul>
            
            <button class="create-group-btn">
                <i class="fas fa-plus"></i> Create Group
            </button>
            
            <h3 class="sidebar-title" style="margin-top: 30px;">Friends</h3>
            <ul class="sidebar-menu">
                <li><a href="#"><i class="fas fa-user"></i> Dr. Sarah Smith</a></li>
                <li><a href="#"><i class="fas fa-user"></i> Dr. Michael Brown</a></li>
                <li><a href="#"><i class="fas fa-user"></i> Emma Johnson</a></li>
                <li><a href="#"><i class="fas fa-user"></i> David Wilson</a></li>
            </ul>
        </div>
        
        <!-- Main Content Area -->
        <div class="main-content">
            <!-- Create Post -->
            <div class="create-post">
                <div class="post-input">
                    <div class="avatar">JD</div>
                    <textarea placeholder="What's on your mind, Dr. John?"></textarea>
                </div>
                <div class="post-actions">
                    <div class="attachment-options">
                        <button class="attachment-btn" title="Photo/Video"><i class="fas fa-image"></i></button>
                        <button class="attachment-btn" title="File"><i class="fas fa-file"></i></button>
                        <button class="attachment-btn" title="Short Video"><i class="fas fa-video"></i></button>
                        <button class="attachment-btn" title="Poll"><i class="fas fa-poll"></i></button>
                    </div>
                    <button class="post-btn">Post</button>
                </div>
            </div>
            
            <!-- Feed Posts -->
            <div class="post">
                <div class="post-header">
                    <div class="avatar">SS</div>
                    <div class="post-user">
                        <h3>Dr. Sarah Smith <i class="fas fa-check-circle verified-badge"></i></h3>
                        <p class="post-time">2 hours ago · <i class="fas fa-globe-americas"></i></p>
                    </div>
                </div>
                <div class="post-content">
                    <p>Just passed my NLE exam with flying colors! Thanks to Acadepass for the amazing study materials and practice tests. Highly recommend to all medical students!</p>
                </div>
                <div class="post-media">
                    <img src="https://images.unsplash.com/photo-1581595219318-a04e8b1e4f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="Study materials">
                </div>
                <div class="post-stats">
                    <div>245 likes</div>
                    <div>42 comments · 8 shares</div>
                </div>
                <div class="post-actions">
                    <button class="post-action">
                        <i class="far fa-thumbs-up"></i> Like
                    </button>
                    <button class="post-action">
                        <i class="far fa-comment"></i> Comment
                    </button>
                    <button class="post-action">
                        <i class="fas fa-share"></i> Share
                    </button>
                    <button class="post-action">
                        <i class="far fa-bookmark"></i> Save
                    </button>
                </div>
            </div>
            
            <div class="post">
                <div class="post-header">
                    <div class="avatar">MW</div>
                    <div class="post-user">
                        <h3>Michael Wang</h3>
                        <p class="post-time">4 hours ago · <i class="fas fa-user-friends"></i> Group: HSK Mastery</p>
                    </div>
                </div>
                <div class="post-content">
                    <p>Sharing my notes from today's HSK 4 class. The grammar points about 把 structure were especially helpful. Let me know if you have any questions!</p>
                </div>
                <div class="post-media">
                    <div style="background: rgba(10, 10, 20, 0.5); border-radius: 12px; padding: 20px; text-align: center;">
                        <i class="fas fa-file-pdf" style="font-size: 3rem; color: var(--accent); margin-bottom: 10px;"></i>
                        <h3>HSK4_Grammar_Notes.pdf</h3>
                        <p>2.4 MB · PDF Document</p>
                        <button style="background: var(--primary); color: white; border: none; padding: 8px 20px; border-radius: 20px; margin-top: 10px; cursor: pointer;">
                            Download
                        </button>
                    </div>
                </div>
                <div class="post-stats">
                    <div>89 likes</div>
                    <div>15 comments · 3 shares</div>
                </div>
                <div class="post-actions">
                    <button class="post-action active">
                        <i class="fas fa-thumbs-up"></i> Like
                    </button>
                    <button class="post-action">
                        <i class="far fa-comment"></i> Comment
                    </button>
                    <button class="post-action">
                        <i class="fas fa-share"></i> Share
                    </button>
                    <button class="post-action">
                        <i class="far fa-bookmark"></i> Save
                    </button>
                </div>
            </div>
            
            <!-- Short Videos Section -->
            <h2 style="margin-top: 30px;">Acadepass Shorts</h2>
            <div class="shorts-container">
                <div class="short-video">
                    <video controls poster="https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80">
                        <source src="#" type="video/mp4">
                    </video>
                    <div class="video-overlay">
                        <h3>Medical Terminology Explained</h3>
                        <p>Dr. Sarah Smith · 5.2K views</p>
                    </div>
                    <div class="video-actions">
                        <div class="video-action">
                            <i class="fas fa-heart"></i>
                            <span>1.2K</span>
                        </div>
                        <div class="video-action">
                            <i class="fas fa-comment"></i>
                            <span>86</span>
                        </div>
                        <div class="video-action">
                            <i class="fas fa-share"></i>
                            <span>Share</span>
                        </div>
                    </div>
                </div>
                
                <div class="short-video">
                    <video controls poster="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80">
                        <source src="#" type="video/mp4">
                    </video>
                    <div class="video-overlay">
                        <h3>Chinese Character Tips</h3>
                        <p>Michael Wang · 3.7K views</p>
                    </div>
                    <div class="video-actions">
                        <div class="video-action">
                            <i class="fas fa-heart"></i>
                            <span>845</span>
                        </div>
                        <div class="video-action">
                            <i class="fas fa-comment"></i>
                            <span>42</span>
                        </div>
                        <div class="video-action">
                            <i class="fas fa-share"></i>
                            <span>Share</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Right Sidebar -->
        <div class="right-sidebar">
            <div class="online-friends">
                <h3 class="sidebar-title">Online Friends</h3>
                <div class="friend-list">
                    <div class="friend">
                        <div class="avatar">SS <span class="status"></span></div>
                        <div class="friend-info">
                            <h4>Dr. Sarah Smith <i class="fas fa-check-circle verified-badge"></i></h4>
                            <p>Active now</p>
                        </div>
                        <button class="message-btn">
                            <i class="fas fa-comment"></i>
                        </button>
                    </div>
                    
                    <div class="friend">
                        <div class="avatar">MB <span class="status"></span></div>
                        <div class="friend-info">
                            <h4>Dr. Michael Brown</h4>
                            <p>Active 5m ago</p>
                        </div>
                        <button class="message-btn">
                            <i class="fas fa-comment"></i>
                        </button>
                    </div>
                    
                    <div class="friend">
                        <div class="avatar">EJ <span class="status"></span></div>
                        <div class="friend-info">
                            <h4>Emma Johnson</h4>
                            <p>Active 1h ago</p>
                        </div>
                        <button class="message-btn">
                            <i class="fas fa-comment"></i>
                        </button>
                    </div>
                </div>
            </div>
            
            <div class="top-students">
                <h3 class="sidebar-title">Top Students</h3>
                <div class="student">
                    <div class="avatar">RS</div>
                    <div>
                        <h4>Robert Smith</h4>
                        <div class="student-badge">NLE Top Scorer</div>
                    </div>
                </div>
                
                <div class="student">
                    <div class="avatar">LZ</div>
                    <div>
                        <h4>Lisa Zhang</h4>
                        <div class="student-badge">HSK Master</div>
                    </div>
                </div>
                
                <div class="student">
                    <div class="avatar">PT</div>
                    <div>
                        <h4>Priya Talwar</h4>
                        <div class="student-badge">English Expert</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Chat Modal -->
    <div class="chat-modal">
        <div class="chat-header">
            <h3><i class="fas fa-comment"></i> Dr. Sarah Smith</h3>
            <button class="close-chat"><i class="fas fa-times"></i></button>
        </div>
        <div class="chat-messages">
            <div class="message incoming">
                <p>Hi John! I saw your post about the NLE exam. Congratulations!</p>
                <div class="message-time">10:24 AM</div>
            </div>
            
            <div class="message outgoing">
                <p>Thanks Sarah! Acadepass was a huge help. How's your preparation going?</p>
                <div class="message-time">10:25 AM</div>
            </div>
            
            <div class="message incoming">
                <p>Going well! I'm using the practice tests daily. Can I ask you about the cardiology section?</p>
                <div class="message-time">10:26 AM</div>
            </div>
        </div>
        <div class="chat-input">
            <input type="text" placeholder="Type a message...">
            <button class="send-btn"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>
    
    <script>
        // Toggle chat modal
        document.querySelectorAll('.message-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.chat-modal').style.display = 'block';
            });
        });
        
        document.querySelector('.close-chat').addEventListener('click', () => {
            document.querySelector('.chat-modal').style.display = 'none';
        });
        
        // Like button functionality
        document.querySelectorAll('.post-action').forEach(btn => {
            btn.addEventListener('click', function() {
                if(this.classList.contains('active')) {
                    this.classList.remove('active');
                    this.innerHTML = '<i class="far fa-thumbs-up"></i> Like';
                } else {
                    this.classList.add('active');
                    this.innerHTML = '<i class="fas fa-thumbs-up"></i> Liked';
                }
            });
        });
        
        // Post button functionality
        document.querySelector('.post-btn').addEventListener('click', () => {
            const textarea = document.querySelector('.create-post textarea');
            if(textarea.value.trim() !== '') {
                alert('Post created successfully!');
                textarea.value = '';
            } else {
                alert('Please write something to post!');
            }
        });
        
        // Simulate active status
        setInterval(() => {
            const status = document.querySelector('.user-badge .status');
            if(status.style.backgroundColor === 'rgb(74, 222, 128)') {
                status.style.backgroundColor = 'gray';
            } else {
                status.style.backgroundColor = '#4ade80';
            }
        }, 5000);
    </script>
</body>
</html>