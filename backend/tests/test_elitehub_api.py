"""
eliteHUB Fortnite Marketplace API Tests
Tests for:
- Account seeding with fncrib format titles
- Price distribution (40% <€5, 40% <€10, 20% <€20)
- Real Fortnite images from fortnite-api.com
- User authentication (register/login)
- Cart operations
- Order creation with credential reveal
- PayPal configuration
"""

import pytest
import requests
import os
import json

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthAndBasicAPI:
    """Health check and basic API tests"""
    
    def test_health_endpoint(self):
        """Test API health endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["database"] == "connected"
        print("✅ Health endpoint working")
    
    def test_root_endpoint(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "eliteHUB" in data["message"]
        print("✅ Root endpoint working")


class TestAccountsSeeding:
    """Tests for account seeding with fncrib format"""
    
    def test_accounts_count(self):
        """Verify 26 accounts are seeded"""
        response = requests.get(f"{BASE_URL}/api/accounts")
        assert response.status_code == 200
        accounts = response.json()
        assert len(accounts) == 26, f"Expected 26 accounts, got {len(accounts)}"
        print(f"✅ Found {len(accounts)} accounts as expected")
    
    def test_fncrib_title_format(self):
        """Verify accounts have fncrib format titles (=== ... ===)"""
        response = requests.get(f"{BASE_URL}/api/accounts")
        accounts = response.json()
        
        fncrib_format_count = 0
        for account in accounts:
            title = account.get("title", "")
            if title.startswith("===") and title.endswith("==="):
                fncrib_format_count += 1
        
        assert fncrib_format_count == 26, f"Expected all 26 accounts with fncrib format, got {fncrib_format_count}"
        print(f"✅ All {fncrib_format_count} accounts have fncrib format titles")
    
    def test_specific_title_formats(self):
        """Verify specific title formats exist"""
        response = requests.get(f"{BASE_URL}/api/accounts")
        accounts = response.json()
        titles = [a["title"] for a in accounts]
        
        # Check for expected title patterns
        expected_patterns = [
            "Merry Mint Axe",
            "Galaxy Skin",
            "VBUCKS",
            "Travis Scott",
            "OG STW",
            "Skins"
        ]
        
        for pattern in expected_patterns:
            found = any(pattern in title for title in titles)
            assert found, f"Expected to find '{pattern}' in titles"
            print(f"✅ Found '{pattern}' pattern in titles")
    
    def test_fortnite_api_images(self):
        """Verify all images are from fortnite-api.com CDN"""
        response = requests.get(f"{BASE_URL}/api/accounts")
        accounts = response.json()
        
        fortnite_api_count = 0
        for account in accounts:
            image = account.get("image", "")
            if "fortnite-api.com" in image:
                fortnite_api_count += 1
        
        assert fortnite_api_count == 26, f"Expected all 26 images from fortnite-api.com, got {fortnite_api_count}"
        print(f"✅ All {fortnite_api_count} images are from fortnite-api.com CDN")


class TestPriceDistribution:
    """Tests for 40/40/20 price distribution"""
    
    def test_price_distribution_40_40_20(self):
        """Verify price distribution: 40% <€5, 40% <€10, 20% <€20"""
        response = requests.get(f"{BASE_URL}/api/accounts")
        accounts = response.json()
        
        total = len(accounts)
        tier1_count = len([a for a in accounts if a['price'] < 5])  # <€5
        tier2_count = len([a for a in accounts if 5 <= a['price'] < 10])  # €5-€10
        tier3_count = len([a for a in accounts if 10 <= a['price'] < 20])  # €10-€20
        
        # Calculate percentages
        tier1_pct = (tier1_count / total) * 100
        tier2_pct = (tier2_count / total) * 100
        tier3_pct = (tier3_count / total) * 100
        
        print(f"📊 Price Distribution:")
        print(f"   Tier 1 (<€5): {tier1_count} accounts ({tier1_pct:.1f}%)")
        print(f"   Tier 2 (€5-€10): {tier2_count} accounts ({tier2_pct:.1f}%)")
        print(f"   Tier 3 (€10-€20): {tier3_count} accounts ({tier3_pct:.1f}%)")
        
        # Allow 5% tolerance for rounding
        assert 35 <= tier1_pct <= 45, f"Tier 1 should be ~40%, got {tier1_pct:.1f}%"
        assert 35 <= tier2_pct <= 45, f"Tier 2 should be ~40%, got {tier2_pct:.1f}%"
        assert 15 <= tier3_pct <= 25, f"Tier 3 should be ~20%, got {tier3_pct:.1f}%"
        
        print("✅ Price distribution matches 40/40/20 rule")
    
    def test_all_prices_under_20(self):
        """Verify all prices are under €20"""
        response = requests.get(f"{BASE_URL}/api/accounts")
        accounts = response.json()
        
        for account in accounts:
            assert account['price'] < 20, f"Account {account['id']} has price €{account['price']} >= €20"
        
        print("✅ All prices are under €20")


class TestSingleAccountEndpoint:
    """Tests for single account retrieval"""
    
    def test_get_single_account(self):
        """Test getting a single account by ID"""
        response = requests.get(f"{BASE_URL}/api/accounts/acc_001")
        assert response.status_code == 200
        account = response.json()
        assert account["id"] == "acc_001"
        assert "===" in account["title"]
        print(f"✅ Single account retrieval working: {account['title'][:50]}...")
    
    def test_account_has_credentials(self):
        """Verify account has email and password fields"""
        response = requests.get(f"{BASE_URL}/api/accounts/acc_001")
        account = response.json()
        
        assert "account_email" in account, "Missing account_email field"
        assert "account_password" in account, "Missing account_password field"
        assert "@" in account["account_email"], "Invalid email format"
        print(f"✅ Account has credentials: {account['account_email']}")


class TestAuthentication:
    """Tests for user authentication"""
    
    @pytest.fixture
    def test_user(self):
        return {
            "email": "test_pytest@elitehub.com",
            "password": "TestPytest123!",
            "name": "Test Pytest User"
        }
    
    def test_register_new_user(self, test_user):
        """Test user registration"""
        response = requests.post(f"{BASE_URL}/api/auth/register", json=test_user)
        # May fail if user already exists, which is fine
        if response.status_code == 200:
            data = response.json()
            assert "access_token" in data
            assert data["user"]["email"] == test_user["email"]
            print(f"✅ User registration successful: {test_user['email']}")
        elif response.status_code == 400:
            print(f"ℹ️ User already exists: {test_user['email']}")
        else:
            pytest.fail(f"Unexpected status code: {response.status_code}")
    
    def test_login_existing_user(self):
        """Test login with test credentials from test_credentials.md"""
        credentials = {
            "email": "testuser_new@elitehub.com",
            "password": "TestNew123!"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=credentials)
        
        if response.status_code == 200:
            data = response.json()
            assert "access_token" in data
            assert data["user"]["email"] == credentials["email"]
            print(f"✅ Login successful: {credentials['email']}")
        elif response.status_code == 401:
            # User may not exist, try to register first
            register_data = {
                "email": "test@elitehub.com",
                "password": "TestElite123!",
                "name": "Test User"
            }
            reg_response = requests.post(f"{BASE_URL}/api/auth/register", json=register_data)
            if reg_response.status_code == 200:
                print("ℹ️ Created test user, retrying login")
                response = requests.post(f"{BASE_URL}/api/auth/login", json=credentials)
                assert response.status_code == 200
                print(f"✅ Login successful after registration")
            else:
                print(f"⚠️ Could not create test user: {reg_response.text}")
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        credentials = {
            "email": "invalid@elitehub.com",
            "password": "wrongpassword"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=credentials)
        assert response.status_code == 401
        print("✅ Invalid credentials correctly rejected")


class TestPayPalConfiguration:
    """Tests for PayPal configuration"""
    
    def test_payment_config_endpoint(self):
        """Test payment config returns PayPal email"""
        response = requests.get(f"{BASE_URL}/api/payments/config")
        assert response.status_code == 200
        data = response.json()
        
        assert "paypal" in data
        assert data["paypal"]["email"] == "poz000@gmail.com"
        print(f"✅ PayPal email configured: {data['paypal']['email']}")


class TestCartOperations:
    """Tests for cart operations (requires authentication)"""
    
    @pytest.fixture
    def auth_token(self):
        """Get authentication token"""
        # First try to login
        credentials = {
            "email": "testuser_new@elitehub.com",
            "password": "TestNew123!"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=credentials)
        
        if response.status_code == 401:
            # Register first
            register_data = {
                "email": "testuser_new@elitehub.com",
                "password": "TestNew123!",
                "name": "Test New User"
            }
            requests.post(f"{BASE_URL}/api/auth/register", json=register_data)
            response = requests.post(f"{BASE_URL}/api/auth/login", json=credentials)
        
        if response.status_code == 200:
            return response.json()["access_token"]
        pytest.skip("Could not authenticate")
    
    def test_get_cart(self, auth_token):
        """Test getting user cart"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/cart/", headers=headers)
        assert response.status_code == 200
        cart = response.json()
        assert "items" in cart
        assert "total" in cart
        print(f"✅ Cart retrieved: {len(cart['items'])} items, €{cart['total']}")
    
    def test_add_to_cart(self, auth_token):
        """Test adding item to cart"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        
        # First clear cart
        requests.delete(f"{BASE_URL}/api/cart/clear", headers=headers)
        
        # Get first account
        accounts_response = requests.get(f"{BASE_URL}/api/accounts")
        account = accounts_response.json()[0]
        
        cart_item = {
            "account_id": account["id"],
            "title": account["title"],
            "price": account["price"],
            "image": account["image"]
        }
        
        response = requests.post(f"{BASE_URL}/api/cart/add", json=cart_item, headers=headers)
        assert response.status_code == 200
        data = response.json()
        assert "cart" in data
        assert len(data["cart"]["items"]) == 1
        print(f"✅ Added to cart: {account['title'][:50]}...")
    
    def test_clear_cart(self, auth_token):
        """Test clearing cart"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.delete(f"{BASE_URL}/api/cart/clear", headers=headers)
        assert response.status_code == 200
        print("✅ Cart cleared successfully")


class TestOrderCreation:
    """Tests for order creation with credential reveal"""
    
    @pytest.fixture
    def auth_token(self):
        """Get authentication token"""
        credentials = {
            "email": "test@elitehub.com",
            "password": "TestElite123!"
        }
        response = requests.post(f"{BASE_URL}/api/auth/login", json=credentials)
        
        if response.status_code == 401:
            register_data = {
                "email": "test@elitehub.com",
                "password": "TestElite123!",
                "name": "Test User"
            }
            requests.post(f"{BASE_URL}/api/auth/register", json=register_data)
            response = requests.post(f"{BASE_URL}/api/auth/login", json=credentials)
        
        if response.status_code == 200:
            return response.json()["access_token"]
        pytest.skip("Could not authenticate")
    
    def test_get_orders(self, auth_token):
        """Test getting user orders"""
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{BASE_URL}/api/orders/", headers=headers)
        assert response.status_code == 200
        orders = response.json()
        assert isinstance(orders, list)
        print(f"✅ Orders retrieved: {len(orders)} orders")


class TestAccountDataIntegrity:
    """Tests for account data integrity"""
    
    def test_all_accounts_have_required_fields(self):
        """Verify all accounts have required fields"""
        response = requests.get(f"{BASE_URL}/api/accounts")
        accounts = response.json()
        
        required_fields = ["id", "title", "price", "image", "platform", "fullAccess"]
        
        for account in accounts:
            for field in required_fields:
                assert field in account, f"Account {account.get('id', 'unknown')} missing field: {field}"
        
        print(f"✅ All {len(accounts)} accounts have required fields")
    
    def test_platforms_are_valid(self):
        """Verify all platforms are PC/PSN"""
        response = requests.get(f"{BASE_URL}/api/accounts")
        accounts = response.json()
        
        for account in accounts:
            platforms = account.get("platform", [])
            assert "PC" in platforms or "PSN" in platforms, f"Account {account['id']} has invalid platforms"
        
        print("✅ All accounts have valid platforms (PC/PSN)")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
