"""Tests for ha-intervals-icu."""

from custom_components.ha_intervals_icu.const import DOMAIN


def test_domain_name():
    """Test integration domain."""

    assert DOMAIN == "ha_intervals_icu"


def test_domain_not_empty():
    """Test domain is defined."""

    assert DOMAIN
    assert isinstance(
        DOMAIN,
        str,
    )
