$pages = @(
  @{dir='customer/find-services'; comp='FindServicesPage'; icon='Search'; title='Find Services'; desc='Search trusted professionals near you.'; action=@('Browse Services','/services')},
  @{dir='customer/bookings'; comp='BookingsPage'; icon='Calendar'; title='My Bookings'; desc='Track your upcoming and past service bookings.'; action=@('Book a Service','/customer/find-services')},
  @{dir='customer/messages'; comp='MessagesPage'; icon='MessageSquare'; title='Messages'; desc='Chat with providers about their bookings.'},
  @{dir='customer/saved-providers'; comp='SavedProvidersPage'; icon='Heart'; title='Saved Providers'; desc='Your favorite professionals, saved for later.'; action=@('Find Services','/services')},
  @{dir='customer/reviews'; comp='ReviewsPage'; icon='Star'; title='Reviews'; desc='Reviews you have written for completed services.'},
  @{dir='customer/payments'; comp='PaymentsPage'; icon='CreditCard'; title='Payments'; desc='Your payment history and receipts.'; action=@('Pay Registration Fee','/payment/registration?role=customer')},
  @{dir='customer/notifications'; comp='NotificationsPage'; icon='Bell'; title='Notifications'; desc='Booking updates, offers, and account alerts.'},
  @{dir='customer/addresses'; comp='AddressesPage'; icon='MapPin'; title='Addresses'; desc='Manage your saved service addresses.'},
  @{dir='customer/support'; comp='SupportPage'; icon='User'; title='Support'; desc='Get help with your account or bookings.'; action=@('Contact Us','/contact')},
  @{dir='customer/settings'; comp='SettingsPage'; icon='Settings'; title='Settings'; desc='Manage your profile, password, and preferences.'},
  @{dir='provider/services'; comp='ProviderServicesPage'; icon='Search'; title='My Services'; desc='Manage the services you offer to customers.'},
  @{dir='provider/bookings'; comp='ProviderBookingsPage'; icon='Calendar'; title='Bookings'; desc='Accept, complete, and track booking requests.'},
  @{dir='provider/messages'; comp='ProviderMessagesPage'; icon='MessageSquare'; title='Messages'; desc='Chat with customers about their bookings.'},
  @{dir='provider/reviews'; comp='ProviderReviewsPage'; icon='Star'; title='Reviews'; desc='Customer reviews and ratings for your work.'},
  @{dir='provider/earnings'; comp='EarningsPage'; icon='CreditCard'; title='Earnings'; desc='Track your income, payouts, and invoices.'; action=@('View Dashboard','/provider/dashboard')},
  @{dir='provider/notifications'; comp='ProviderNotificationsPage'; icon='Bell'; title='Notifications'; desc='New requests, reviews, and account alerts.'},
  @{dir='provider/profile'; comp='ProfilePage'; icon='Building2'; title='Public Profile'; desc='See and edit how customers view your profile.'},
  @{dir='provider/verification'; comp='VerificationPage'; icon='ShieldCheck'; title='Verification'; desc='Submit documents to earn your verified badge.'},
  @{dir='provider/support'; comp='ProviderSupportPage'; icon='User'; title='Support'; desc='Get help with bookings, payments, or your account.'; action=@('Contact Us','/contact')},
  @{dir='provider/settings'; comp='ProviderSettingsPage'; icon='Settings'; title='Settings'; desc='Manage your business profile, password, and preferences.'},
  @{dir='admin/users'; comp='UsersPage'; icon='Users'; title='Users'; desc='Manage customer and provider accounts.'},
  @{dir='admin/providers'; comp='AdminProvidersPage'; icon='Building2'; title='Providers'; desc='Review and manage provider listings.'},
  @{dir='admin/categories'; comp='CategoriesPage'; icon='Search'; title='Categories'; desc='Manage service categories and ordering.'},
  @{dir='admin/bookings'; comp='AdminBookingsPage'; icon='Calendar'; title='Bookings'; desc='Monitor all platform bookings.'},
  @{dir='admin/payments'; comp='AdminPaymentsPage'; icon='CreditCard'; title='Payments'; desc='Track platform payments and payouts.'},
  @{dir='admin/reviews'; comp='AdminReviewsPage'; icon='Star'; title='Reviews'; desc='Moderate reviews across the platform.'},
  @{dir='admin/reports'; comp='ReportsPage'; icon='TrendingUp'; title='Reports'; desc='Fraud, dispute, and abuse reports.'},
  @{dir='admin/notifications'; comp='AdminNotificationsPage'; icon='Bell'; title='Notifications'; desc='Platform alerts and system notifications.'},
  @{dir='admin/settings'; comp='AdminSettingsPage'; icon='Settings'; title='Settings'; desc='Platform configuration and admin preferences.'}
)

$root = 'c:\Users\SYED BROTHERs\OneDrive\Desktop\SMIT\localtrust\src\app'
$utf8 = New-Object System.Text.UTF8Encoding($false)

foreach ($p in $pages) {
  $dir = Join-Path $root $p.dir
  New-Item -ItemType Directory -Path $dir -Force | Out-Null

  $lines = @()
  $lines += "import { $($p.icon) } from `"lucide-react`";"
  $lines += "import { SectionPage } from `"@/components/dashboard/section-page`";"
  $lines += ""
  $lines += "export default function $($p.comp) {"
  $lines += "  return ("
  $lines += "    <SectionPage"
  $lines += "      title=`"$($p.title)`""
  $lines += "      description=`"$($p.desc)`""
  $lines += "      icon={<$($p.icon) className=`"w-5 h-5`" />}"
  if ($p.action) {
    $lines += "      action={{ label: `"$($p.action[0])`", href: `"$($p.action[1])`" }}"
  }
  $lines += "    />"
  $lines += "  );"
  $lines += "}"

  $file = Join-Path $dir 'page.tsx'
  [System.IO.File]::WriteAllText($file, (($lines -join "`n") + "`n"), $utf8)
}

Write-Host "generated $($pages.Count) pages"
$total = (Get-ChildItem $root -Recurse -Filter page.tsx | Measure-Object).Count
Write-Host "total pages: $total"
