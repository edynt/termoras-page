export const translations = {
  en: {
    // Navbar
    nav: {
      features: 'Features',
      showcase: 'Showcase',
      tech: 'Tech',
      feedback: 'Feedback',
      buyACoffee: 'Buy a coffee',
      donors: 'Donors',
      download: 'Download',
    },

    // Hero
    hero: {
      badgeSuffix: '— Now available for macOS, Linux & Windows',
      headingLine1: 'Your terminals,',
      headingHighlight: 'organized.',
      subtitle:
        'A native desktop app that organizes your terminals by project — with built-in task boards, Git integration, and command automation.',
      downloadAppleSilicon: 'macOS Apple Silicon',
      downloadIntel: 'macOS Intel',
      downloadLinux: 'Linux Ubuntu / Debian',
      downloadWindows: 'Windows x64',
      metaSuffix: '.dmg / .deb / .exe installer',
      trustLine: 'Free & open source. No sign-up. Fully offline. Your code stays on your machine.',
    },

    // About / Description
    about: {
      label: 'About',
      title: 'What is Termoras?',
      subtitle:
        'Termoras is a terminal management app built for developers who work on multiple projects at the same time.',
      problem: {
        title: 'The problem',
        description:
          'Developers constantly switch between terminal windows, task trackers, and Git clients. Context switching kills productivity and makes it easy to lose track of what you were doing.',
      },
      solution: {
        title: 'The solution',
        description:
          'Termoras groups terminals by project and adds built-in kanban boards and a Git diff viewer — all in one window. No more juggling apps. Just open your project and everything is right there.',
      },
    },

    // Features
    features: {
      label: 'Features',
      title: 'Everything you need, nothing you don\'t',
      subtitle: 'Built for developers who juggle multiple projects daily.',
      items: [
        {
          title: 'Project-based Terminals',
          description:
            'Group terminals by project. Switch between projects without killing processes. Each terminal runs a real PTY shell session.',
        },
        {
          title: 'Built-in Kanban Board',
          description:
            'Plan tasks right next to your code. Drag-and-drop cards, assign tags, and auto-run terminal commands from cards — no context switching.',
        },
        {
          title: 'Git Integration',
          description:
            'Stage, commit, and push from a built-in diff viewer. Split or unified view with syntax highlighting and line numbers.',
        },
        {
          title: 'Blazing Fast',
          description:
            'Built with Tauri + Rust backend. Native performance with minimal memory footprint — starts instantly, uses less than 100MB RAM.',
        },
        {
          title: 'Light & Dark Themes',
          description:
            'Switch seamlessly between light and dark modes. Carefully crafted color palettes for comfortable all-day use.',
        },
        {
          title: 'Multi-project Workflow',
          description:
            'Add projects by folder. See running indicators, git status badges, and change counts at a glance in the sidebar.',
        },
      ],
    },

    // Showcase
    showcase: {
      label: 'Showcase',
      title: 'Built for your',
      titleHighlight: 'daily workflow',
      subtitle: 'From terminal to task management to version control — all in one window.',
      kanban: {
        title: 'Kanban Board',
        description:
          'Drag-and-drop task management with custom tags, auto-run commands, and one-click execution. Plan and ship features alongside your terminal.',
      },
      diff: {
        title: 'Diff Viewer',
        description:
          'Review file changes with syntax highlighting, line numbers, and split or unified view modes. Stage, commit, and push without leaving the app.',
      },
    },

    // Tech Stack
    tech: {
      label: 'Built With',
      title: 'Modern tech, native feel',
      subtitle:
        'Powered by the best tools in the ecosystem for performance and developer experience.',
    },

    // Download CTA
    downloadCta: {
      title: 'Ready to organize your',
      titleHighlight: 'terminal workflow',
      subtitle: 'Download Termoras for free and get started in seconds.',
      appleSilicon: 'macOS Apple Silicon',
      intel: 'macOS Intel',
      linux: 'Linux Ubuntu / Debian',
      windows: 'Windows x64',
      dmg: '.dmg / .deb / .exe installer',
      macOnly: 'macOS, Linux & Windows',
      trustNoData: 'No data collection',
      trustOffline: 'Works offline',
      trustNoAccount: 'No account needed',
    },

    // Footer
    footer: {
      tagline: 'A native terminal manager for developers.',
      copy: '© 2026 Termoras. Built with Tauri + React + Rust.',
      openSource: 'Open Source on GitHub',
    },

    // Feedback widget
    feedback: {
      btnLabel: 'Feedback',
      title: 'Send Feedback',
      subtitle: 'Help us improve Termoras',
      nameLabel: 'Name',
      namePlaceholder: 'Your name',
      ratingLabel: 'Rating',
      messageLabel: 'Message',
      messagePlaceholder: "What's on your mind?",
      sending: 'Sending...',
      send: 'Send Feedback',
      thankYou: 'Thank you!',
      submitted: 'Your feedback has been submitted.',
    },

    // Feedback public page
    feedbackPage: {
      title: 'Community Feedback',
      subtitle: 'See what others are saying about Termoras',
      total: 'Total',
      avgRating: 'Avg Rating',
      resolved: 'Resolved',
      filterAll: 'All',
      filterPending: 'Pending',
      filterResolved: 'Resolved',
      dismiss: 'Dismiss',
      noFeedbacks: 'No feedbacks yet. Be the first!',
      noFiltered: 'No {filter} feedbacks.',
      statusResolved: 'Resolved',
      statusPending: 'Pending',
      backToHome: 'Back to home',
    },

    // Donors public page
    donorsPage: {
      title: 'Wall of Thanks',
      subtitle: 'Everyone who bought us a coffee',
      totalDonors: 'Total Donors',
      donations: 'Donations',
      totalRaised: 'Total Raised',
      topSupporters: 'Top 10 Supporters',
      noDonationsYet: 'No donations yet. Be the first!',
      recentDonations: 'Recent Donations',
      noDonationsEmpty: 'No donations yet. Be the first to buy us a coffee!',
      buyACoffee: 'Buy a coffee',
      donation: 'donation',
      donationPlural: 'donations',
    },

    // Donate section
    donate: {
      badge: 'Support Us',
      title: 'Buy us a coffee',
      subtitle: 'If Termoras helps your workflow, a small contribution keeps development going.',
      paypal: 'PayPal',
      bankTransfer: 'Bank Transfer',
      or: 'or',
      custom: 'Custom',
      buyViaPaypal: 'Buy a ${amount} coffee via PayPal',
      paypalRedirect: "You'll be redirected to PayPal to complete.",
      scanQr: 'Scan QR code with your banking app',
      qrAutoFill: 'Amount & transfer note are pre-filled automatically.',
    },
  },

  vi: {
    // Navbar
    nav: {
      features: 'Tính năng',
      showcase: 'Trình diễn',
      tech: 'Công nghệ',
      feedback: 'Góp ý',
      buyACoffee: 'Mua cà phê',
      donors: 'Nhà tài trợ',
      download: 'Tải xuống',
    },

    // Hero
    hero: {
      badgeSuffix: '— Đã có sẵn cho macOS, Linux & Windows',
      headingLine1: 'Terminal của bạn,',
      headingHighlight: 'ngăn nắp.',
      subtitle:
        'Ứng dụng desktop giúp gom nhóm terminal theo dự án — tích hợp bảng công việc, Git, và tự động hóa lệnh.',
      downloadAppleSilicon: 'macOS Apple Silicon',
      downloadIntel: 'macOS Intel',
      downloadLinux: 'Linux Ubuntu / Debian',
      downloadWindows: 'Windows x64',
      metaSuffix: 'Bộ cài .dmg / .deb / .exe',
      trustLine: 'Miễn phí & mã nguồn mở. Không cần đăng ký. Hoàn toàn offline. Code của bạn luôn nằm trên máy bạn.',
    },

    // About / Description
    about: {
      label: 'Giới thiệu',
      title: 'Termoras là gì?',
      subtitle:
        'Termoras là ứng dụng quản lý terminal dành cho lập trình viên làm việc với nhiều dự án cùng lúc.',
      problem: {
        title: 'Vấn đề',
        description:
          'Lập trình viên liên tục chuyển đổi giữa cửa sổ terminal, trình quản lý công việc và Git client. Việc chuyển ngữ cảnh liên tục giết chết năng suất và dễ mất dấu công việc đang làm.',
      },
      solution: {
        title: 'Giải pháp',
        description:
          'Termoras gom nhóm terminal theo dự án, tích hợp kanban board và Git diff viewer — tất cả trong một cửa sổ. Không cần chuyển đổi giữa nhiều ứng dụng. Chỉ cần mở dự án và mọi thứ đều ở ngay đó.',
      },
    },

    // Features
    features: {
      label: 'Tính năng',
      title: 'Mọi thứ bạn cần, không gì thừa',
      subtitle: 'Xây dựng cho lập trình viên quản lý nhiều dự án mỗi ngày.',
      items: [
        {
          title: 'Terminal theo dự án',
          description:
            'Gom nhóm terminal theo dự án. Chuyển đổi giữa các dự án mà không cần tắt tiến trình. Mỗi terminal chạy phiên shell PTY thực.',
        },
        {
          title: 'Kanban Board tích hợp',
          description:
            'Lên kế hoạch ngay cạnh code. Kéo thả thẻ, gán tag, và tự động chạy lệnh terminal từ thẻ — không cần chuyển ngữ cảnh.',
        },
        {
          title: 'Tích hợp Git',
          description:
            'Stage, commit, push từ trình xem diff tích hợp. Chế độ xem tách hoặc gộp với tô sáng cú pháp và số dòng.',
        },
        {
          title: 'Siêu nhanh',
          description:
            'Xây dựng với Tauri + Rust. Hiệu suất native với bộ nhớ tối thiểu — khởi động tức thì, dùng dưới 100MB RAM.',
        },
        {
          title: 'Giao diện sáng & tối',
          description:
            'Chuyển đổi mượt mà giữa chế độ sáng và tối. Bảng màu được thiết kế tỉ mỉ cho trải nghiệm cả ngày.',
        },
        {
          title: 'Quản lý đa dự án',
          description:
            'Thêm dự án theo thư mục. Xem chỉ báo đang chạy, trạng thái git và số thay đổi ngay trên sidebar.',
        },
      ],
    },

    // Showcase
    showcase: {
      label: 'Trình diễn',
      title: 'Xây dựng cho',
      titleHighlight: 'quy trình hàng ngày',
      subtitle: 'Từ terminal đến quản lý công việc đến quản lý phiên bản — tất cả trong một cửa sổ.',
      kanban: {
        title: 'Kanban Board',
        description:
          'Quản lý công việc kéo thả với tag tùy chỉnh, tự động chạy lệnh, và thực thi một chạm. Lên kế hoạch và triển khai tính năng ngay cạnh terminal.',
      },
      diff: {
        title: 'Trình xem Diff',
        description:
          'Xem thay đổi file với tô sáng cú pháp, số dòng, và chế độ xem tách hoặc gộp. Stage, commit, push mà không rời ứng dụng.',
      },
    },

    // Tech Stack
    tech: {
      label: 'Công nghệ',
      title: 'Công nghệ hiện đại, cảm giác native',
      subtitle:
        'Sử dụng những công cụ tốt nhất trong hệ sinh thái để đạt hiệu suất và trải nghiệm lập trình tối ưu.',
    },

    // Download CTA
    downloadCta: {
      title: 'Sẵn sàng sắp xếp',
      titleHighlight: 'quy trình terminal',
      subtitle: 'Tải Termoras miễn phí và bắt đầu trong vài giây.',
      appleSilicon: 'macOS Apple Silicon',
      intel: 'macOS Intel',
      linux: 'Linux Ubuntu / Debian',
      windows: 'Windows x64',
      dmg: 'Bộ cài .dmg / .deb / .exe',
      macOnly: 'macOS, Linux & Windows',
      trustNoData: 'Không thu thập dữ liệu',
      trustOffline: 'Hoạt động offline',
      trustNoAccount: 'Không cần tài khoản',
    },

    // Footer
    footer: {
      tagline: 'Trình quản lý terminal cho lập trình viên.',
      copy: '© 2026 Termoras. Xây dựng với Tauri + React + Rust.',
      openSource: 'Mã nguồn mở trên GitHub',
    },

    // Feedback widget
    feedback: {
      btnLabel: 'Góp ý',
      title: 'Gửi góp ý',
      subtitle: 'Giúp chúng tôi cải thiện Termoras',
      nameLabel: 'Tên',
      namePlaceholder: 'Tên của bạn',
      ratingLabel: 'Đánh giá',
      messageLabel: 'Tin nhắn',
      messagePlaceholder: 'Bạn nghĩ gì?',
      sending: 'Đang gửi...',
      send: 'Gửi góp ý',
      thankYou: 'Cảm ơn bạn!',
      submitted: 'Góp ý của bạn đã được gửi.',
    },

    // Feedback public page
    feedbackPage: {
      title: 'Góp ý cộng đồng',
      subtitle: 'Xem mọi người nói gì về Termoras',
      total: 'Tổng',
      avgRating: 'Đánh giá TB',
      resolved: 'Đã xử lý',
      filterAll: 'Tất cả',
      filterPending: 'Chờ xử lý',
      filterResolved: 'Đã xử lý',
      dismiss: 'Bỏ qua',
      noFeedbacks: 'Chưa có góp ý. Hãy là người đầu tiên!',
      noFiltered: 'Không có góp ý {filter}.',
      statusResolved: 'Đã xử lý',
      statusPending: 'Chờ xử lý',
      backToHome: 'Về trang chủ',
    },

    // Donors public page
    donorsPage: {
      title: 'Bảng tri ân',
      subtitle: 'Những người đã mua cà phê cho chúng tôi',
      totalDonors: 'Nhà tài trợ',
      donations: 'Lượt ủng hộ',
      totalRaised: 'Tổng quyên góp',
      topSupporters: 'Top 10 người ủng hộ',
      noDonationsYet: 'Chưa có quyên góp. Hãy là người đầu tiên!',
      recentDonations: 'Quyên góp gần đây',
      noDonationsEmpty: 'Chưa có quyên góp. Hãy là người đầu tiên mua cà phê cho chúng tôi!',
      buyACoffee: 'Mua cà phê',
      donation: 'lượt',
      donationPlural: 'lượt',
    },

    // Donate section
    donate: {
      badge: 'Ủng hộ',
      title: 'Mua cà phê cho chúng tôi',
      subtitle: 'Nếu Termoras giúp ích cho công việc của bạn, một đóng góp nhỏ giúp duy trì phát triển.',
      paypal: 'PayPal',
      bankTransfer: 'Chuyển khoản',
      or: 'hoặc',
      custom: 'Tùy chỉnh',
      buyViaPaypal: 'Mua cà phê ${amount} qua PayPal',
      paypalRedirect: 'Bạn sẽ được chuyển đến PayPal để hoàn tất.',
      scanQr: 'Quét mã QR bằng ứng dụng ngân hàng',
      qrAutoFill: 'Số tiền và nội dung chuyển khoản được điền sẵn tự động.',
    },
  },
}

export type Language = keyof typeof translations
export type Translations = typeof translations['en']
